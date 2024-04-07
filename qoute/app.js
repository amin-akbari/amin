// import * as fn from './methods.js'
import { copyBtn as copyBtn2, copyFn, authorName } from './methods.js';
import {speechFn , speech} from "./speechsynthesis.js";
import { tweetFn } from './main.js';

window.alert('You can change voice , pitch and Rate using box on your left!!');

const qouteBtn = document.getElementById('new-qoute')
const baseApi = 'https://api.quotable.io';
const paragraph = document.querySelector('.quote');


const showBioBtn =document.getElementById('bioOfAuthorBtn');
const bioHolder = document.getElementById('bioContent');
const wikiPediaBtn = document.getElementById('goToWikiBtn');
const anchorTagOfWikiPedia = document.getElementById('wikiPediaAnchorTag'); 

const copyBtn = document.querySelector('.copy');
const speechBtn = document.querySelector('.speech');
const tweetBtn = document.querySelector('.twitter')
// console.log(copyBtn);
// console.log(copyBtn2);

qouteBtn.addEventListener('click', async (e) => {
    qouteBtn.classList.add('loading');
    qouteBtn.innerText = 'qoute loading ...';
    // If user wants to get another qoute it will hide the bio section and cancels Speech synthesis utterance
    bioHolder.classList.add('hide-bio-author');
    bioHolder.classList.remove('show-bio-author');
    showBioBtn.innerText = `Get Bio Of This Author`;
    wikiPediaBtn.classList.add('hide-wiki-btn');
    wikiPediaBtn.classList.remove('show-wiki-btn');
    speech.cancel();

    try {
        const res = await fetch(`${baseApi}/random`);
        const data = await res.json();
        console.log(data);
        showQoute(data);
    } catch (error) {
        window.alert('Check your Conection');
    }

    qouteBtn.classList.remove('loading');
    qouteBtn.innerText = 'New Quote';
})
function showQoute(quoteData) {
    paragraph.innerText = quoteData.content;
    authorName.innerText = quoteData.author;
    let authorsSlug = quoteData.authorSlug;
    getAuthorsSlug(authorsSlug);
    

}
async function getAuthorsSlug(author) {
        const authorsssSlug = `https://api.quotable.io/search/authors?query=${author}`;
        try {
            const res = await fetch(`${authorsssSlug}`);
            const data = await res.json();
            putBioInBox(data);
        } catch (error) {

        }
}
// a function to Get bio and link to wikipedia
function putBioInBox(bioauthor){
    bioHolder.innerText = bioauthor.results[0].bio;
    const anchorTagPath = bioauthor.results[0].link;
    anchorTagOfWikiPedia.href=`${anchorTagPath}`;
}
// A function to open and close the Bio section
showBioBtn.addEventListener('click', () => {
    if(bioHolder.classList == ('show-bio-author')){
        bioHolder.classList.add('hide-bio-author');
        bioHolder.classList.remove('show-bio-author');
        showBioBtn.innerText = `Get Bio Of This Author`;
        wikiPediaBtn.classList.add('hide-wiki-btn');
        wikiPediaBtn.classList.remove('show-wiki-btn');
    }else{
        bioHolder.classList.add('show-bio-author');
        bioHolder.classList.remove('hide-bio-author');
        showBioBtn.innerText = `Close Bio`;
        wikiPediaBtn.classList.add('show-wiki-btn');
        wikiPediaBtn.classList.remove('hide-wiki-btn');
    }
})
copyBtn.addEventListener('click', copyFn);

speechBtn.addEventListener('click', speechFn);

tweetBtn.addEventListener('click', tweetFn);