window.addEventListener('load', () => {
    inputName = document.querySelector('#inputName')
    
    preventFormSubmit()
    activateInput()
    render()
})

let globalNames = ['Um', 'Dois', 'Três', 'Quatro']
let inputName = null
let isEditing = false
let currentIndex = null

function preventFormSubmit() {
    function handleFormSubmit(event) {
        event.preventDefault()
    }

    let form = document.querySelector('form')
    form.addEventListener('submit', handleFormSubmit)
}

function activateInput() {
    function insertName (newName) {
        //globalNames.push(newName)
        globalNames = [...globalNames, newName]
    }

    function updatedName(newName) {
        globalNames[currentIndex] = newName
    }

    function handleTyping(event) {
        let hasText = !!event.target.value && event.target.value.trim() !== ''

        if (!hasText) {
            clearInput()
            return
        }

        if (event.key === 'Enter') {
            if (isEditing){
                updatedName(event.target.value)
            } else{
                insertName(event.target.value)
            }

            render()
            isEditing = false
            clearInput()
        }
    }

    inputName.focus()
    inputName.addEventListener('keyup', handleTyping)
}

function render() {
    function createDeleteButton(index) {

        function deleteName() {
            //globalNames.splice(index, 1)
            // globalNames = globalNames.filter((name, i) => {
            //     if (i === index) {
            //         return false
            //     }
            //     return true
            globalNames = globalNames.filter((_, i) => i !== index)
            render()
        }

        let button = document.createElement('button')
        //button.classList.add('deletebutton')
        button.textContent = 'x'

        button.addEventListener('click', deleteName)

        return button
    }

    function createSpan(name, index) {
        function editItem() {
            inputName.value = name
            inputName.focus()
            isEditing = true
            currentIndex = index
        }

        let span = document.createElement('span')
        span.classList.add('clickable')
        span.textContent = name
        span.addEventListener('click', editItem)

        return span
    }

    let divNames = document.querySelector('#names')
    divNames.innerHTML = ''
    
    let ul = document.createElement('ul')

    for (let i = 0; i < globalNames.length; i++) {
        let currentName = globalNames[i]

        let li = document.createElement('li')
        let button = createDeleteButton(i)
        let span = createSpan(currentName, i)


        li.appendChild(button)
        li.appendChild(span)

        ul.appendChild(li)
    }

    divNames.appendChild(ul)
    clearInput()
}

// function clearInput() {
//     inputName.value  = ''
//     inputName.focus()
// }

const clearInput = () => {
    inputName.value = ''
    inputName.focus()
}