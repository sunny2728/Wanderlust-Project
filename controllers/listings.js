const Listing= require("../models/listing");

module.exports.index=async(req,res) =>{
    const allListings= await Listing.find({});
    res.render("listings/index.ejs",{allListings}); 
}

module.exports.new=async(req,res) =>{
    res.render("listings/new.ejs");
}
module.exports.show=async(req,res)=> {
    let {id}= req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews",populate:{ path: "author" }}).populate("owner");
    if(!listing){
        req.flash("Error","Listing you requested for does not exist!");
        res.redirect("/listings"); 
    }
    res.render("listings/show.ejs", {listing});
}

module.exports.create=async(req,res) => {
    let url= req.file.path;
    let filename= req.file.filename;
    if(!req.body.listing){
        throw new ExpressError(400,"Send valid data for listing!");
    }
    const newListing= new Listing(req.body.listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    await  newListing.save();
    req.flash("success", "New Listing created");
    res.redirect("/listings");
}

module.exports.edit=async(req,res)=>{
    let {id}= req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("Error","Listing you requested for does not exist!");
        res.redirect("/listings"); 
    }  
    let OriImg= listing.image.url;
    OriImg=OriImg.replace("/upload","/upload/h_200,w_50");

    res.render("listings/edit.ejs", {listing,OriImg}, (err,html)=>{
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred while rendering the page.');
          } else {
            res.send(html);     
          }
    });
}

module.exports.update=async(req, res) => {
    let { id } = req.params;
    let listing=await Listing.findByIdAndUpdate(id, {...req.body.listing });
    if(typeof req.file != "undefined"){
    let url= req.file.path;
    let filename= req.file.filename;
    listing.image= {url,filename};
    await  listing.save();
    }
    req.flash("success", " Listing updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.delete=async(req,res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Delete!");
    console.log(deletedListing);
    res.redirect("/listings");
}