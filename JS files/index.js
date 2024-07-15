/// <reference types="../@types/jquery"/>

const body = document.querySelector('body')
const openNav = document.querySelector('.fa-bars')
const closeNav = document.querySelector('.fa-xmark')
const navbarTab = document.querySelector('.navbar-tab')
const loader = document.querySelector('.loader')
const homeSelector = document.querySelector('.home')
const detailsSelector = document.querySelector('.details')
const searchSelector = document.querySelector('.search')
const categorySelector = document.querySelector('.category')
const areaSelector = document.querySelector('.area')
const contactSelector = document.querySelector('.contact')
const ingredientsSelector = document.querySelector('.ingredients')
const homeRow = document.querySelector('#homeRow')
const detailRow = document.querySelector('#detailRow')
const searchRow = document.querySelector('#searchRow')
const categoryRow = document.querySelector('#categoryRow')
const areaRow = document.querySelector('#areaRow')
const ingredientsRow = document.querySelector('#ingredientsRow')
const submitBtn = document.querySelector('#submitBtn')
const links = document.querySelectorAll(".navbar-links li")
const searchByName = document.querySelector('#byName')
const searchbyFirstLetter = document.querySelector('#byFirstLetter')



///////////// Navbar

function dNone() {

    $('section').addClass('d-none')

}

openNav.addEventListener("click", () => {

    closeNav.classList.remove('d-none')
    openNav.classList.add('d-none')
    $(navbarTab).animate({ width: "100%", paddingInline: "24px" }, 500)

    setTimeout(() => {

        links[0].classList.remove("d-none")

        links[0].classList.add("animate__animated", "animate__slideInUp")


    }, 400)

    setTimeout(() => {

        links[1].classList.remove("d-none")

        links[1].classList.add("animate__animated", "animate__slideInUp")

    }, 500)

    setTimeout(() => {

        links[2].classList.remove("d-none")


        links[2].classList.add("animate__animated", "animate__slideInUp")

    }, 600)

    setTimeout(() => {

        links[3].classList.remove("d-none")


        links[3].classList.add("animate__animated", "animate__slideInUp")

    }, 700)
    setTimeout(() => {

        links[4].classList.remove("d-none")


        links[4].classList.add("animate__animated", "animate__slideInUp")

    }, 800)

})

closeNav.addEventListener('click', () => {

    closeNav.classList.add('d-none')
    openNav.classList.remove('d-none')
    $(navbarTab).animate({ width: "0%", paddingInline: "0" }, 500)

    setTimeout(() => {

        for (let i = 0; i < links.length; i++) {

            links[i].classList.add("d-none")

            links[i].classList.remove("animate__animated", "animate__slideInUp")

        }

    }, 500)

})




/////////Home

async function homeApi() {

    loader.classList.remove('d-none')

    try {

        let payload = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=American');
        let result = await payload.json();

        mealsDisplay(homeRow, result.meals)
        loader.classList.add('d-none')


    } catch (error) {
        console.log(error)
    }

}

homeApi()

function mealsDisplay(row, data) {

    cartona = " ";

    for (let i = 0; i < data.length; i++) {

        if (i < 20) {

            cartona += ` <div class="col-md-3">
                        <div class="meal overflow-hidden rounded-2 position-relative" id="${data[i].idMeal}">
                            <img src="${data[i].strMealThumb}" class="w-100" alt="${data[i].strMeal}">
                            <div class="meal-overlay d-flex align-items-center text-black ">
                                <h3>${data[i].strMeal}</h3>
                            </div>
                        </div>

                    </div>`

        }


    }

    row.innerHTML = cartona

    const meal = document.querySelectorAll('.meal')

    meal.forEach((meal) => {

        meal.addEventListener("click", (e) => {

            mealDetailsApi(e.currentTarget.id)

        })


    })

}

async function mealDetailsApi(id) {

    detailsSelector.classList.remove('d-none')

    body.classList.add("overflow-hidden")

    loader.classList.remove('d-none')


    try {

        let payload = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        let result = await payload.json();
        
        loader.classList.add('d-none')

        mealDetailsDisplay(result.meals[0])


    } catch (error) {
        console.log(error)
    }

}

function mealDetailsDisplay(data) {

    detailRow.innerHTML = `
    
    <div class="col-md-4">

                    <div class="image-item">
                        <img src="${data.strMealThumb}" class="w-100 rounded-3 mb-2" alt="${data.strMeal}">
                        <h2>${data.strMeal}</h2>
                    </div>

                </div>

                <div class="col-md-8">

                    <div class="details-item">

                        <h2>Instructions</h2>
                        <p>${data.strInstructions}</p>
                            <h3><span class="fw-bolder">Area : </span> ${data.strArea}</h3>
                            <h3><span class="fw-bolder">Category :</span>${data.strCategory}</h3>
                            <h3>Recipes :</h3>
                            <ul class="list-unstyled d-flex flex-wrap g-3">
                            

                            ${recipes(data)}


                            </ul>
                            <h3>tags : </h3>
                            <ul class="list-unstyled d-flex flex-wrap g-3">
                            
                            ${tags(data)}
                               
                            </ul>
                            <a href="${data.strSource}" target="_blank" class="btn btn-success">Source</a>
                            <a href="${data.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>

                    </div>

                </div>

    `

    function tags(tags) {

        let tagArray = []

        let cartona = ''

        if (tags.strTags != null && tags.strTags != " ") {

            tagArray = tags.strTags.split(',')

            for (let i = 0; i < tagArray.length; i++) {

                cartona += `<li class="alert alert-danger m-2 p-1">${tagArray[i]}</li>`
            }

        }

        return cartona
    }

    function recipes(recipes) {

        let cartona = ""

        for(i=1;i<=20;i++){

            if(recipes[`strIngredient${i}`]){

                cartona += `<li class="alert alert-success m-2 p-1">${recipes[`strMeasure${i}`]} ${recipes[`strIngredient${i}`]}</li>`
            }

        }

        return cartona

    }
}



////////Search

links[0].addEventListener("click", () => {

    dNone()

    searchSelector.classList.remove('d-none')

})

searchByName.addEventListener('input', () => {

    searchApi(searchByName.value)

    async function searchApi(name) {

        loader.classList.remove('d-none')

        try {

            let payload = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
            let result = await payload.json();
            mealsDisplay(searchRow, result.meals)
            loader.classList.add('d-none')


        } catch (error) {
            console.log(error)
        }

    }
})

searchbyFirstLetter.addEventListener('input', () => {

    searchApi(searchbyFirstLetter.value[0])

    async function searchApi(letter) {

        loader.classList.remove('d-none')

        try {

            let payload = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${letter}`);
            let result = await payload.json();
            mealsDisplay(searchRow, result.meals)
            loader.classList.add('d-none')


        } catch (error) {
            console.log(error)
        }

    }
})




////////// Category

links[1].addEventListener("click", () => {

    dNone()

    categorySelector.classList.remove('d-none')

    categoryApi()

})

async function categoryApi() {

    loader.classList.remove('d-none')

    try {

        let payload = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        let result = await payload.json();
        categoryDisplay(result.categories)
        loader.classList.add('d-none')


    } catch (error) {
        console.log(error)
    }
}

function categoryDisplay(data) {

    let cartona = ""

    for (let i = 0; i < data.length; i++) {

        cartona += `
    
       <div class="col-md-3">
                        <div class="categoryD overflow-hidden rounded-2 position-relative" data-category="" id="${data[i].idCategory}">
                            <img src="${data[i].strCategoryThumb}" class="w-100" alt="${data[i].strCategory}">
                            <div class="category-overlay d-flex flex-column align-items-center text-center text-black ">
                                <h3>${data[i].strCategory}</h3>
                                <p>${data[i].strCategoryDescription}</p>
                            </div>
                        </div>

                    </div>

    `


    }

    categoryRow.innerHTML = cartona

    const category = document.querySelectorAll('.categoryD')

    category.forEach((category) => {

        category.addEventListener("click", (e) => {

            const categoryName = $(e.currentTarget).children("img").attr("alt")
            categoryFilterApi(categoryName)

        })


    })

}

async function categoryFilterApi(category) {

    loader.classList.remove('d-none')

    try {

        let payload = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        let result = await payload.json();
        mealsDisplay(categoryRow, result.meals)
        loader.classList.add('d-none')


    } catch (error) {
        console.log(error)
    }

}




//////// Area

links[2].addEventListener("click", () => {

    dNone()

    areaSelector.classList.remove('d-none')

    areaApi()

})

async function areaApi() {

    loader.classList.remove('d-none')

    try {

        let payload = await fetch(`https:\\www.themealdb.com/api/json/v1/1/list.php?a=list`);
        let result = await payload.json();
        
        areaDisplay(result.meals)
        loader.classList.add('d-none')


    } catch (error) {
        console.log(error)
    }
}

function areaDisplay(area) {

    cartona = ""

    for (i = 0; i < area.length; i++) {

        cartona += `
        
        
                    <div class="col-md-3">

                        <div class="area-item text-center">

                            <i class="fa-solid fa-house-laptop fa-4x"></i>
                            <h3>${area[i].strArea}</h3>

                        </div>
                    </div>

        
        `
    }

    areaRow.innerHTML = cartona

    const areaItem = document.querySelectorAll('.area-item')

    areaItem.forEach((area) => {

        area.addEventListener("click", () => {

            const name = $(area).children('h3').text()

            areaMealsDisplay(name)

        })
    })
}

async function areaMealsDisplay(name) {

    loader.classList.remove('d-none')

    try {

        let payload = await fetch(`https:\\www.themealdb.com/api/json/v1/1/filter.php?a=${name}`);
        let result = await payload.json();
        
        mealsDisplay(areaRow, result.meals)
        loader.classList.add('d-none')


    } catch (error) {

        console.log(error)

    }

}




///// Ingerdient

links[3].addEventListener("click", () => {

    dNone()

    ingredientsSelector.classList.remove('d-none')

    ingerdientsApi()

})

async function ingerdientsApi() {

    loader.classList.remove('d-none')

    try {

        let payload = await fetch(`https:\\www.themealdb.com/api/json/v1/1/list.php?i=list`);
        let result = await payload.json();
        
        ingerdientsDisplay(result.meals)
        loader.classList.add('d-none')


    } catch (error) {
        console.log(error)
    }
}

function ingerdientsDisplay(data) {

    cartona = ""

    for (i = 0; i < data.length; i++) {

        cartona += `
        
        
    <div class="col-md-3">

    <div class="ingredients-item text-center">

        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${data[i].strIngredient}</h3>
        <p>${cut(data[i].strDescription)}</p>

    </div>
    
    </div>

        
        `
    }

    function cut(str) {

        let string = `${str}`


        return string.slice(0, 110)
    }



    ingredientsRow.innerHTML = cartona

    const ingredientItem = document.querySelectorAll('.ingredients-item')

    ingredientItem.forEach((ingredient) => {

        ingredient.addEventListener("click", () => {

            const name = $(ingredient).children('h3').text()

            ingerdientsMealsApi(name);

        })
    })


}

async function ingerdientsMealsApi(name) {

    loader.classList.remove('d-none')

    try {

        let payload = await fetch(`https:\\www.themealdb.com/api/json/v1/1/filter.php?i=${name}`);
        let result = await payload.json();
        mealsDisplay(ingredientsRow, result.meals)
        loader.classList.add('d-none')


    } catch (error) {

        console.log(error)

    }
}




/////// Contact

const nameInput = document.querySelector('#name')
const emailInput = document.querySelector('#email')
const phoneInput = document.querySelector('#phone')
const ageInput = document.querySelector('#age')
const passwordInput = document.querySelector('#password')
const repasswordInput = document.querySelector('#repassword')
const inputs = document.querySelectorAll('.contact input')


links[4].addEventListener("click", () => {

    dNone()

    contactSelector.classList.remove('d-none')

})


submitBtn.addEventListener('click', function () {

    submitBtn.classList.replace('enable', 'disabled')

    inputs.forEach((input) => {

        input.value = null;
        input.classList.remove('valid')

    })
})

for (let i = 0; i < inputs.length; i++) {

    inputs[i].addEventListener('input', function () {

        setTimeout(function () {
            if (nameInput.classList.contains('valid') && emailInput.classList.contains('valid') && phoneInput.classList.contains('valid') && ageInput.classList.contains('valid') && repasswordInput.classList.contains('valid') && passwordInput.classList.contains('valid')) {

                submitBtn.classList.replace('disabled', 'enable')

            }
            else {

                submitBtn.classList.replace('enable', 'disabled')

            }

        }, 200)

    })
}


$(nameInput).on('input', () => {

    const regex = /^[a-z-A-z]{0,20}$/gm;

    validation(nameInput, regex, nameInput.value)
})

$(emailInput).on('input', () => {

    const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;

    validation(emailInput, regex, emailInput.value)
})

$(phoneInput).on('input', () => {

    const regex = /^[0][1][0-9]{9}$/gm;

    validation(phoneInput, regex, phoneInput.value)
})

$(ageInput).on('input', () => {

    const regex = /^[1-9][0-9]{0,1}$/gm;

    validation(ageInput, regex, ageInput.value)
})


$(passwordInput).on('input', () => {

    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm;

    validation(passwordInput, regex, passwordInput.value)
})

$(repasswordInput).on('input', () => {

    if (repasswordInput.value === passwordInput.value) {

        repasswordInput.classList.add("valid");
        repasswordInput.nextElementSibling.classList.add('d-none')
    }
    else {

        repasswordInput.classList.remove("valid");
        repasswordInput.nextElementSibling.classList.remove('d-none')
    }

})

function validation(element, reg, value) {

    if (reg.test(value)) {
        element.classList.add("valid");
        element.nextElementSibling.classList.add('d-none')
    }
    else {

        element.classList.remove("valid");
        element.nextElementSibling.classList.remove('d-none')

    }
}
