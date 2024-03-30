export const loadPosts = async () => {
    const postsJson = await fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json());
    const photosJson = await fetch('https://jsonplaceholder.typicode.com/photos')
    .then(response => response.json());

    let completePosts = [];

    postsJson.forEach((post, index) => {
      completePosts.push({
        ...post,
        ...photosJson[index],
      })
    })

    return completePosts;
}