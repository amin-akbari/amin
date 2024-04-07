

export const paragraph = document.querySelector('.quote');
export const authorName = document.querySelector('.name');
export const getBioBtn = document.getElementById('bioOfAuthor');


export const copyFn = () => {
    navigator.clipboard.writeText(paragraph.innerText)
}



export const tweetFn = () => {
    const tweet = `https://twitter.com/intent/tweet?url=${paragraph.innerText}`

    window.open(tweet, '_blank')
}

// export default copyFn
export const copyBtn = 'salam'