const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 4000;
const BASE_URL = "http://20.244.56.144/evaluation-service";
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNjA2NzI3LCJpYXQiOjE3NDM2MDY0MjcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjQ3MzUwYzUzLTRlNDUtNDBjMS1iZjU1LTE5NDJlNTJmMmQ0NiIsInN1YiI6IjIyMDUxODQ0QGtpaXQuYWMuaW4ifSwiZW1haWwiOiIyMjA1MTg0NEBraWl0LmFjLmluIiwibmFtZSI6ImFyeWFuIiwicm9sbE5vIjoiMjIwNTE4NDQiLCJhY2Nlc3NDb2RlIjoibndwd3JaIiwiY2xpZW50SUQiOiI0NzM1MGM1My00ZTQ1LTQwYzEtYmY1NS0xOTQyZTUyZjJkNDYiLCJjbGllbnRTZWNyZXQiOiJkQ0dyRktrS2NSYXZVaFl2In0.E0IEwLdQZC8HFwX4txiOs8h_zus3B2tvcXUN86fiIqQ";

// Fetch users
async function fetchUsers() {
    try {
        const response = await axios.get(`${BASE_URL}/users`, {
            headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
        });
        return response.data.users || [];
    } catch (error) {
        console.error("Error fetching users:", error.response?.data || error.message);
        return [];
    }
}

// Fetch posts for a user
async function fetchPostsForUser(userId) {
    try {
        const response = await axios.get(`${BASE_URL}/users/${userId}/posts`, {
            headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
        });
        return response.data.posts || [];
    } catch (error) {
        console.error(`Error fetching posts for user ${userId}:`, error.response?.data || error.message);
        return [];
    }
}

// Fetch comments for a post
async function fetchCommentsForPost(postId) {
    try {
        const response = await axios.get(`${BASE_URL}/posts/${postId}/comments`, {
            headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
        });
        return response.data.comments || [];
    } catch (error) {
        console.error(`Error fetching comments for post ${postId}:`, error.response?.data || error.message);
        return [];
    }
}

// Get top 5 users with the most posts
app.get('/users/top', async (req, res) => {
    try {
        const users = await fetchUsers();
        const userPosts = await Promise.all(users.map(async (user) => {
            const posts = await fetchPostsForUser(user.id);
            return { user, postCount: posts.length };
        }));

        userPosts.sort((a, b) => b.postCount - a.postCount);
        res.json(userPosts.slice(0, 5).map(u => ({
            id: u.user.id,
            name: u.user.name,
            posts: u.postCount
        })));
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch top users" });
    }
});

// Get posts for a user
app.get('/users/:userid/posts', async (req, res) => {
    const { userid } = req.params;
    try {
        const posts = await fetchPostsForUser(userid);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch posts for user ${userid}` });
    }
});

// Get comments for a post
app.get('/posts/:postid/comments', async (req, res) => {
    const { postid } = req.params;
    try {
        const comments = await fetchCommentsForPost(postid);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch comments for post ${postid}` });
    }
});

// Get popular/latest posts
app.get('/posts', async (req, res) => {
    const { type } = req.query;
    try {
        const users = await fetchUsers();
        let allPosts = [];

        for (const user of users) {
            const posts = await fetchPostsForUser(user.id);
            allPosts.push(...posts);
        }

        if (type === 'popular') {
            const postsWithComments = await Promise.all(
                allPosts.map(async (post) => {
                    const comments = await fetchCommentsForPost(post.id);
                    return { ...post, commentCount: comments.length };
                })
            );

            postsWithComments.sort((a, b) => b.commentCount - a.commentCount);
            return res.json(postsWithComments);
        }

        if (type === 'latest') {
            allPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            return res.json(allPosts.slice(0, 5));
        }

        res.status(400).json({ error: "Invalid type parameter" });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
