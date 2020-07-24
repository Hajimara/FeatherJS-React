module.exports = (rootKey,documentObj)=>{
    console.log(rootKey, documentObj);
    for (const key in documentObj) {
        if (documentObj.hasOwnProperty(rootKey)) {
            const element = documentObj[key];
            
        }
    }
    

}