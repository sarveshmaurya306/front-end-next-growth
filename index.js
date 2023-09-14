(function () {
  "use strict";
  // variable 

  document.getElementById("buttonEvent1").addEventListener('click', handleButtonClick);
  document.getElementById("buttonEvent2").addEventListener('click', handleButtonClick);
  document.getElementById("buttonEvent3").addEventListener('click', handleButtonClick);
  document.getElementById("userRange").addEventListener('change', onSliderInputChange);
  window.addEventListener('scroll', runOnScroll)

  const card1 = document.getElementById("card1"),
    card2 = document.getElementById("card2"),
    card3 = document.getElementById("card3");
  

  //execute on load
  document.addEventListener('DOMContentLoaded', function () {
    console.log('hello, my name is sarvesh, I have made this project to showcase my front-end skills, also this app is enabled with ci/cd using gitlab ci/cd pipelines');
    onSliderInputChange();
    loadMoreImage();
  }, false);

  // event functions
  function handleButtonClick(event) {
    document.getElementById('selectedPriceValue').setAttribute('value', event.target.value)
  }

  function onSliderInputChange(event) {
    const sliderValue = event?.target?.value || 0;
    document.getElementById('selectedUser').innerText = sliderValue;

    function clearClass() {
      card1.classList.remove("border", "border-primary");
      card1.firstElementChild.classList.remove("bg-primary")
      card2.classList.remove("border", "border-primary");
      card2.firstElementChild.classList.remove("bg-primary")
      card3.classList.remove("border", "border-primary");
      card3.firstElementChild.classList.remove("bg-primary")
    }

    if (sliderValue >= 0 && sliderValue <= 10) {

      clearClass();
      card1.classList.add("border", "border-primary");
      card1.firstElementChild.classList.add("bg-primary")

    } else if (sliderValue > 10 && sliderValue <= 20) {

      clearClass();
      card2.classList.add("border", "border-primary");
      card2.firstElementChild.classList.add("bg-primary")

    } else {

      clearClass();
      card3.classList.add("border", "border-primary");
      card3.firstElementChild.classList.add("bg-primary")

    }
  }

  function runOnScroll() {
    if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1){
      loadMoreImage();
    }
  }
  

  // normal functions
  function loadMoreImage() {

    let defaultLoad = 8;
    let container= document.getElementById('imgGalery');
    const loader= document.getElementById('loader');

    loader.classList.remove('d-none');
    loader.classList.add('d-flex');
    const promises= []

    let i = 0;
    while (i < defaultLoad) {
      const currPromise= fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
          const img = document.createElement('img');
          img.src = data.message
          img.width = 300
          img.alt = "img not found"
          img.classList.add('col-12', 'col-md-6', 'col-lg-4', 'col-xl-3', 'my-3');
          container.appendChild(img);
        })
      i++;

      promises.push(currPromise)
    }

    // hide the loader after getting all result
    Promise.all(promises).then((res)=>{
      loader.classList.add('d-none');
      loader.classList.remove('d-flex');
    }).catch((err)=>{
      console.log(err);
    })
  }

})()