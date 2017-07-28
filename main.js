/*
  Here is a rough idea for the steps you could take:
*/
// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play

let player = document.querySelector(".player");
let queryResults = document.querySelector(".queryResults");
let queryInput = document.querySelector("#queryInput");
let preview = document.querySelectorAll(".prevButton");

function querySubmit() {

  queryResults.innerHTML = "";
  // User input to append to the fetch request
  let userQuery = queryInput.value.replace(/ /g,'+');
  // userQuery = userQuery.replace(/ /g,'+');

  fetch(`https://itunes.apple.com/search?term=${userQuery}`)

    //Show error if app - parse JSON
    .then(function(response) {
      if (response.status !== 200) {
        console.log("error")
      } else {
        return response.json();
      }
    })

    //Populate individul returned fields - also create distinct ids for preview buttons
    //Album link to artistViewUrl for artist bio
    .then(function(data) {
      let results = data.results;
      for (let i = 0; i < results.length; i++) {
        queryResults.innerHTML += `
        <div class="resultContainer">
          <div class="imgContainer">
            <a href="${results[i].artistViewUrl}"><img src="${results[i].artworkUrl100}" title="${results[i].collectionName}" alt="${results[i].collectionName}-Album Art"></a>
          </div>
          <p class="trackName">${results[i].trackName}</p>
          <p class="artistName">${results[i].artistName}</p>
          <button id="preview${[i]}" class="prevButton" type="button" name="button">Preview Song</button>
        </div>
        `
      }
      // Each prevbutton repopulates playback section
      for (let i = 0; i < results.length; i++) {
        let preview = document.querySelectorAll(".prevButton");
        preview[i].addEventListener("click", function() {
          setTimeout(function(){
            player.innerHTML = `
            <audio class="playBack" controls="true" src="${results[i].previewUrl}" autoplay></audio>
            <p id="prevData">${results[i].artistName} - ${results[i].trackName}</p>
            `
          },2000)
        });
      }
    })

  //   function preview(){
  //     player.innerHTML = `
  // <audio class="playBack" controls="true" src="${results[i].previewUrl}"></audio>
  // <p id="prevData">${results[i].artistName} - ${results[i].trackName}</p>
  // `
  //   }
}
