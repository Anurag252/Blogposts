function blog()
{
    var getpost = {};
    getpost.GetHeading = () => {return "test heading"};
    getpost.GetImageUrl = () => {return "test heading"};
    getpost.GetContent = () => {return "test heading"};
    getpost.GetCreatedDate = () => {return "test heading"};
    console.log(getpost.GetHeading())
    return getpost;
}


export default blog;