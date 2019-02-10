import axios from 'axios';
const BASE_URL = 'http://localhost:3003/image'



function getUserImages(userId) {
    return axios.get(`${BASE_URL}/images/${userId}`)
        .then(res =>{
            return res.data
        })
}
function getPostById(postId) {
    var post = gImages.filter(post =>
        post.id === postId)
    return Promise.resolve(post[0]);
}
function getImageOwnerId(photoId) {
    var post = gImages.filter(photo =>
        photo.id === photoId)
    return Promise.resolve(post[0].userId);
}

export default {
    getUserImages,
    getPostById,
    getImageOwnerId
}


var gImages = [
    { id: 1, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfoJyjOEmC1vB8PCWoDwqOmqS2EMNsklbJckGhwAePQP68FELl", userId: 1,
    comments:[{commentOwner:"Nickname10", comment:'fjsadfsjado fjsiafo sajfiosda'},{commentOwner:"Nickname9", comment:'fjsadfsjagg dsgssiafo'},{commentOwner:"Nickname7", comment:'yay'},
    {commentOwner:"Nickname1", comment:'fjsadfsjado fjsigdfs dfkopfd fkdsopfksa fkaspofda'},{commentOwner:"Nickname10", comment:'fjsadfsjado fjsiafo sajfiosda'},{commentOwner:"Nickname9", comment:'fjsadfsjagg dsgssiafo'},{commentOwner:"Nickname7", comment:'yay'},
    {commentOwner:"Nickname1", comment:'fkoaspkf fksoapfksa fdskofask fkapksd fksoafkask ffposkfasp fokfdasofko fkoapkfposaskfpasjgo fksaopfkap'},{commentOwner:"Nickname10", comment:'fjsadfsjado fjsiafo sajfiosda'},{commentOwner:"Nickname9", comment:'fjsadfsjagg dsgssiafo'},{commentOwner:"Nickname7", comment:'yay'},
    {commentOwner:"Nickname1", comment:'fjsadfsjado fjsigdfs dfkopfd fkdsopfksaf fjasoj  fskdaofska fkaspofda'},  {commentOwner:"Nickname1", comment:'fkoaspkf fksoapfksa fdskofask fkapksd fksoafkask ffposkfasp fokfdasofko fkoapkfposaskfpasjgo fksaopfkap'},{commentOwner:"Nickname10", comment:'fjsadfsjado fjsiafo sajfiosda'},{commentOwner:"Nickname9", comment:'fjsadfsjagg dsgssiafo'},{commentOwner:"Nickname7", comment:'yay'},
    {commentOwner:"Nickname1", comment:'fjsadfsjado fjsigdfs dfkopfd fkdsopfksaf fjasoj  fskdaofska fkaspofda'}]


},
   

    { id: 2, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUGxNFP6y1sr6vOYAzCGy58BbQMNoJzkaZoSPas57K6xVmbiUZgA", userId: 2 , 
    comments:[{commentOwner:"Nickname10", comment:'fjsadfsjado fjsiafo sajfiosda'},{commentOwner:"Nickname9", comment:'fjsadfsjagg dsgssiafo'},{commentOwner:"Nickname7", comment:'yay'},
    {commentOwner:"Nickname1", comment:'fjsadfsjado fjsigdfs dfkopfd fkdsopfksa fkaspofda'}]
},
    { id: 3, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPHTXe53aCClWItZ8XQFOKVf4xVv2xemvolkPGQrGNPeeE5nAesw", userId: 3 ,
    comments:[{commentOwner:"Nickname10", comment:'fjsadfsjado fjsiafo sajfiosda'},{commentOwner:"Nickname9", comment:'fjsadfsjagg dsgssiafo'},{commentOwner:"Nickname7", comment:'yay'},
    {commentOwner:"Nickname1", comment:'fjsadfsjado fjsigdfs dfkopfd fkdsopfksa fkaspofda'}]
},
    { id: 4, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGMENteKWpWhfD0oQn5hlZI2duDY1Vj6OV4htf_pgw0cNFeUll", userId: 4 ,  
    comments:[{commentOwner:"Nickname10", comment:'fjsadfsjado fjsiafo sajfiosda'},{commentOwner:"Nickname9", comment:'fjsadfsjagg dsgssiafo'},{commentOwner:"Nickname7", comment:'yay'},
    {commentOwner:"Nickname1", comment:'fjsadfsjado fjsigdfs dfkopfd fkdsopfksa fkaspofda'}]
},
    { id: 5, image: "https://amikinos.fr/wp-content/uploads/2017/02/img_link_ref_cat.png", userId: 1 ,  
    comments:[{commentOwner:"Nickname10", comment:'fjsadfsjado fjsiafo sajfiosda'},{commentOwner:"Nickname9", comment:'fjsadfsjagg dsgssiafo'},{commentOwner:"Nickname7", comment:'yay'},
    {commentOwner:"Nickname1", comment:'fjsadfsjado fjsigdfs dfkopfd fkdsopfksa fkaspofda'}]
},
    // { id: 6, image: "https://s.abcnews.com/images/Health/puppies-01-stock-gty-jef-180920_hpMain_16x9_1600.jpg", userId: 2 , comments:"this is a very very cute kitten or puppy"},
    // { id: 7, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfoJyjOEmC1vB8PCWoDwqOmqS2EMNsklbJckGhwAePQP68FELl", userId: 3 , comments:"this is a very very cute kitten or puppy"},
    // { id: 8, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUGxNFP6y1sr6vOYAzCGy58BbQMNoJzkaZoSPas57K6xVmbiUZgA", userId: 4 , comments:"this is a very very cute kitten or puppy"},
    // { id: 9, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPHTXe53aCClWItZ8XQFOKVf4xVv2xemvolkPGQrGNPeeE5nAesw", userId: 1 , comments:"this is a very very cute kitten or puppy"},
    // { id: 10, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGMENteKWpWhfD0oQn5hlZI2duDY1Vj6OV4htf_pgw0cNFeUll", userId: 2 , comments:"this is a very very cute kitten or puppy"},
    // { id: 11, image: "https://amikinos.fr/wp-content/uploads/2017/02/img_link_ref_cat.png", userId: 3 , comments:"this is a very very cute kitten or puppy"},
    // { id: 12, image: "https://s.abcnews.com/images/Health/puppies-01-stock-gty-jef-180920_hpMain_16x9_1600.jpg", userId: 4 , comments:"this is a very very cute kitten or puppy"},
    // { id: 13, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfoJyjOEmC1vB8PCWoDwqOmqS2EMNsklbJckGhwAePQP68FELl", userId: 1 , comments:"this is a very very cute kitten or puppy"},
    // { id: 14, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUGxNFP6y1sr6vOYAzCGy58BbQMNoJzkaZoSPas57K6xVmbiUZgA", userId: 2 , comments:"this is a very very cute kitten or puppy"},
    // { id: 15, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPHTXe53aCClWItZ8XQFOKVf4xVv2xemvolkPGQrGNPeeE5nAesw", userId: 3 , comments:"this is a very very cute kitten or puppy"},
    // { id: 16, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGMENteKWpWhfD0oQn5hlZI2duDY1Vj6OV4htf_pgw0cNFeUll", userId: 4 , comments:"this is a very very cute kitten or puppy"},
    // { id: 17, image: "https://amikinos.fr/wp-content/uploads/2017/02/img_link_ref_cat.png", userId: 1 , comments:"this is a very very cute kitten or puppy"},
    // { id: 18, image: "https://s.abcnews.com/images/Health/puppies-01-stock-gty-jef-180920_hpMain_16x9_1600.jpg", userId: 2 , comments:"this is a very very cute kitten or puppy"},
    // { id: 19, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfoJyjOEmC1vB8PCWoDwqOmqS2EMNsklbJckGhwAePQP68FELl", userId: 3 , comments:"this is a very very cute kitten or puppy"},
    // { id: 20, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUGxNFP6y1sr6vOYAzCGy58BbQMNoJzkaZoSPas57K6xVmbiUZgA", userId: 4 , comments:"this is a very very cute kitten or puppy"},
    // { id: 21, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPHTXe53aCClWItZ8XQFOKVf4xVv2xemvolkPGQrGNPeeE5nAesw", userId: 1 , comments:"this is a very very cute kitten or puppy"},
    // { id: 22, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGMENteKWpWhfD0oQn5hlZI2duDY1Vj6OV4htf_pgw0cNFeUll", userId: 2 , comments:"this is a very very cute kitten or puppy"},
    // { id: 23, image: "https://amikinos.fr/wp-content/uploads/2017/02/img_link_ref_cat.png", userId: 3 , comments:"this is a very very cute kitten or puppy"},
    // { id: 24, image: "https://s.abcnews.com/images/Health/puppies-01-stock-gty-jef-180920_hpMain_16x9_1600.jpg", userId: 4 , comments:"this is a very very cute kitten or puppy"},
    // { id: 25, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfoJyjOEmC1vB8PCWoDwqOmqS2EMNsklbJckGhwAePQP68FELl", userId: 1 , comments:"this is a very very cute kitten or puppy"},
    // { id: 26, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUGxNFP6y1sr6vOYAzCGy58BbQMNoJzkaZoSPas57K6xVmbiUZgA", userId: 2 , comments:"this is a very very cute kitten or puppy"},
    // { id: 27, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPHTXe53aCClWItZ8XQFOKVf4xVv2xemvolkPGQrGNPeeE5nAesw", userId: 3 , comments:"this is a very very cute kitten or puppy"},
    // { id: 28, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGMENteKWpWhfD0oQn5hlZI2duDY1Vj6OV4htf_pgw0cNFeUll", userId: 4 , comments:"this is a very very cute kitten or puppy"},
    // { id: 29, image: "https://amikinos.fr/wp-content/uploads/2017/02/img_link_ref_cat.png", userId: 1 , comments:"this is a very very cute kitten or puppy"},
    // { id: 30, image: "https://s.abcnews.com/images/Health/puppies-01-stock-gty-jef-180920_hpMain_16x9_1600.jpg", userId: 2 , comments:"this is a very very cute kitten or puppy"},
]
