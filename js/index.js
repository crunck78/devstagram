

let users = [
    {
        date: "2020-10-03",
        id: 0,
        name: "Mihai",
        posts: [0, 1],
        comments: [],
        img: "img/profile.png"
    },
    {
        date: "2022-12-24",
        id: 1,
        name: "Andrei",
        posts: [],
        comments: [1],
        img: "img/profile.png"
    },
    {
        date: "2020-10-03",
        id: 2,
        name: "Neacsu",
        posts: [2],
        comments: [],
        img: "img/profile.png"
    }
];

let comments = [
    {
        id: 0,
        author: 1,
        post: 0,
        date: "2021-06-15",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, consequuntur? Sapiente nobis facere quae quo voluptatibus dolorum quos dolor reiciendis ullam qui, ipsam blanditiis voluptatum, rem, rerum ea accusamus eos!",
    }
];

let posts = [
    {
        id: 0,
        author: 0,
        comments: [0],
        location: "home",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, consequuntur? Sapiente nobis facere quae quo voluptatibus dolorum quos dolor reiciendis ullam qui, ipsam blanditiis voluptatum, rem, rerum ea accusamus eos!",
        img: { path: "img/pexels-drew-rae-580679.jpg", alt: "Foto von Drew Rae von Pexels" },
        appreciations: 0,
        date: "2021-12-01"
    },
    {
        id: 1,
        author: 1,
        comments: [],
        location: "vacation",
        text: "lorem",
        img: { path: "img/pexels-luis-gomes-546819.jpg", alt: "Foto von luis gomes von Pexels" },
        appreciations: 0,
        date: "2021-12-01"
    },
    {
        id: 2,
        author: 2,
        comments: [],
        location: "work",
        text: "lorem",
        img: { path: "img/pexels-saksham-choudhary-2036656.jpg", alt: "Foto von Saksham Choudhary von Pexels" },
        appreciations: 0,
        date: "2021-12-01"
    }
];

let currentUser = users[0];

function init() {
    includeHTML();
    showPosts();
}

function showPosts() {
    fillContainer("", "posts-container", posts, generatePostHTML);
    posts.forEach( post => showPostComments(post));
}

function generatePostHTML(post) {
    return `
    <div id="post${post.ref.id}" class="post-card">
        <div class="post-header">
            <div class="post-profile-info">
                <img class="profile-img post-profile-img pointer" src="${getElementById(users, post.ref.author).img}" alt="">
                <div class="post-profile-name-location">
                    <span class="pointer profile-name"><b>${getElementById(users, post.ref.author).name}</b></span>
                    <span class="pointer">${post.ref.location}</span>
                </div>
            </div>
            <div class="post-dialog-opener pointer">...</div>
        </div>
        <img class="post-img" src="${post.ref.img.path}" alt="${post.ref.img.alt}">
        <div class="post-content">
            <div class="post-section">
                <img onclick="appreciatePost()" class="pointer" src="img/favorite-4-48.png" alt="">
                <img class="pointer" src="img/comments-48.png" alt="">
                <img class="pointer" src="img/paper-plane-48.png" alt="">
                <img class="pointer" src="img/bookmark-5-48.png" alt="">
            </div>
            <div onclick="openDialog()" class="post-section pointer">
                Gefällt <span id="appreciations-post${post.ref.id}">${post.ref.appreciations}</span> Mal
            </div>
            <div class="post-section">
                <div class="">
                    <b class="post-user-name pointer">${getElementById(users, post.ref.author).name}</b>
                    <span class="post-text">${post.ref.text}</span>
                </div>
                <div class="comments-container">
                    <button class="all-comments-btn pointer" onclick="showAllPostComments('postId')">Alle <span>${post.ref.comments.length}</span> Kommentare ansehen</button>
                    <div id="comments-post${post.ref.id}"></div>
                </div>
            </div>
            <div class="post-section">
                <span class="post-time pointer">${post.ref.date}</span>
            </div>
            <div class="post-section">
                <div class="pointer"><img src="img/emoticon-30-48.png" alt=""></div>
                <textarea id="input-comment-${post.ref.id}" placeholder="Kommentar hinzufügen..." name="" class="input-comment-field" cols="30" rows="10"></textarea>
                <div onclick="comment(${post.ref.id}, ${currentUser.id})" class="pointer">POSTEN</div>
            </div>
        </div>
    </div>
    `;
}

function showPostComments(post){
    let postComments = comments.filter(comment => comment.post == post.id);
    fillContainer("", `comments-post${post.id}`, postComments, generateCommentHTML);
}

function generateCommentHTML(comment){
    return`
    <div class="user-comment" id="comment-previouse-user">
        <b class="comment-user-name pointer">${getElementById(users, comment.ref.author).name}</b>
        <span class="comment-user-text">${comment.ref.text}</span>
    </div>`;
}

function collectCode() {
    return `<div id="post-last-comments">
                <div class="user-comment" id="comment-previouse-user">
                    <b class="comment-user-name pointer">name</b>
                    <span class="comment-user-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, consequuntur? Sapiente nobis facere quae quo voluptatibus dolorum quos dolor reiciendis ullam qui, ipsam blanditiis voluptatum, rem, rerum ea accusamus eos!</span>
                </div>
                <div id="comment-last-user">
                    <b class="comment-user-name pointer">name</b>
                    <span class="comment-user-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, consequuntur? Sapiente nobis facere quae quo voluptatibus dolorum quos dolor reiciendis ullam qui, ipsam blanditiis voluptatum, rem, rerum ea accusamus eos!</span>
                </div>
            </div>`;
}

function comment(postId, userId) {
    const newComment = {
        id: getNewIdForCollection(comments),
        author: userId,
        date: new Date().getTime(),
        text: document.getElementById("input-comment-" + postId).value.replace(/\n\r?/g, "<br />"),
        post: postId,
    }
    comments.push(newComment);
    const post = getElementById(posts, postId);
    const user = getElementById(users, userId);
    post.comments.push(newComment.id);
    user.comments.push(newComment.id);

    showPostComments(post);

    document.getElementById("input-comment-" + postId).value = "";
}