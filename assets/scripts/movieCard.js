export const movieCard = (id, title, image, rating) => {
    const template = document.querySelector('.movieListTemplate').cloneNode(true);
    template.innerHTML = template.innerHTML.replace('{{movieId}}', id);
    template.innerHTML = template.innerHTML.replace('{{title}}', title);
    template.innerHTML = template.innerHTML.replace('{{imageUrl}}', image);
    template.innerHTML = template.innerHTML.replace('{{rating}}', rating);
    return template.content;
}