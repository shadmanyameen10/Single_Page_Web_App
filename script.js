const rootDiv = document.getElementById('root');

let userName = '';
let posts = [];

// Render Sign-Up Page
function renderSignUp() {
    rootDiv.innerHTML = `
        <h1>Sign Up</h1>
        <form id="signupForm">
            <label for="name">Name:</label>
            <input type="text" id="name" placeholder="Enter your name"><br>
            <label for="email">Email:</label>
            <input type="email" id="email" placeholder="Enter your email"><br>
            <label for="password">Password:</label>
            <input type="password" id="password" placeholder="Enter your password"><br>
            <button type="button" onclick="handleSignUp()">Sign Up</button>
        </form>
    `;
}

// Handle User Sign-Up
function handleSignUp() {
    const nameInput = document.getElementById('name').value;
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;
    if (nameInput && emailInput && passwordInput) {
        userName = nameInput; // Store the user's name in a global variable
        renderHomePage();     // Move to the next step in the app
    } else {
        alert('Please fill out all fields');
    }
}

// Render Home Page
function renderHomePage() {
    rootDiv.innerHTML = `
        <h1>Welcome, ${userName}!</h1>
        <h2>Create a Post</h2>
        <textarea id="postContent" placeholder="What's on your mind?"></textarea><br>
        <button type="button" onclick="handleCreatePost()">Post</button>
        <h3>Your Posts</h3>
        <ul id="postList"></ul>
    `;
}

// Handle Post Creation
function handleCreatePost() {
    const postContent = document.getElementById('postContent').value;
    
    if (postContent) {
        posts.push(postContent); // Add the new post to the posts array
        renderPostList();        // Update the displayed post list
    } else {
        alert('Post content cannot be empty');
    }
}

// Render List of Posts
function renderPostList() {
    const postListElement = document.getElementById('postList');
    postListElement.innerHTML = ''; // Clear the current list
    posts.forEach((post, index) => {
        const postItem = document.createElement('li');
        postItem.textContent = post;

        // Create Edit Button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editPost(index); // Pass the index of the post to edit
        postItem.appendChild(editButton); // Add the edit button to the post item

        // Create Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deletePost(index); // Pass the index of the post to delete
        postItem.appendChild(deleteButton); // Add the delete button to the post item

        postListElement.appendChild(postItem);
    });
}

function editPost(index) {
    const newContent = prompt('Edit your post:', posts[index]);
    if (newContent !== null) { // If the user didn't cancel the prompt
        posts[index] = newContent; // Update the post at the given index
        renderPostList(); // Re-render the post list after editing
    }
}

function deletePost(index) {
    posts.splice(index, 1); // Remove the post at the given index
    renderPostList(); // Re-render the post list after deletion
}

// Initialize the app by showing the sign-up page
renderSignUp();
