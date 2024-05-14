'use strict'

const openModal = () => document.getElementById('modal').classList.add('active')
const openModal2 = () => document.getElementById('modal2').classList.add('active')

const closeModal2 = () => {
    document.getElementById('modal2').classList.remove('active')
}

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_livro')) ?? []
const setLocalStorage = (dbLivro) => localStorage.setItem("db_livro", JSON.stringify(dbLivro))

// CRUD - create read update delete
const deleteLivro = (index) => {
    const dbLivro = readLivro()
    dbLivro.splice(index, 1)
    setLocalStorage(dbLivro)
}

const updateLivro = (index, livro) => {
    const dbLivro = readLivro()
    dbLivro[index] = livro
    setLocalStorage(dbLivro)
}

const readLivro = () => getLocalStorage()

const createLivro = (livro) => {
    const dbLivro = getLocalStorage()
    dbLivro.push (livro)
    setLocalStorage(dbLivro)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interação com o layout
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('nome').dataset.index = 'new'
}

//Campos para serem salvos
const saveLivro = () => {
    debugger
    if (isValidFields()) {
        const livro = {
            codigo: document.getElementById('codigo').value,
            nome: document.getElementById('nome').value,
            ano: document.getElementById('ano').value,
            categoria: document.getElementById('categoria').value,
            editora: document.getElementById('editora').value,
            isbn: document.getElementById('isbn').value,
            autor: document.getElementById('autor').value

        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            createLivro(livro)
            updateTable()
            closeModal()
        } else {
            updateLivro(index, livro)
            updateTable()
            closeModal()
        }
    }
}

//Tabela de Apresentação
const createRow = (livro, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${livro.codigo}</td>
        <td>${livro.nome}</td>
        <td>${livro.categoria}</td>
        <td>${livro.editora}</td>
        <td>${livro.autor}</td>
      
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tableLivro>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableLivro>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbLivro = readLivro()
    clearTable()
    dbLivro.forEach(createRow)
}

//Apresentação tabela modal
const fillFields = (livro) => {
    document.getElementById('codigo').value = livro.codigo
    document.getElementById('nome').value = livro.nome
    document.getElementById('ano').value = livro.ano
    document.getElementById('categoria').value = livro.categoria
    document.getElementById('editora').value = livro.editora 
    document.getElementById('isbn').value = livro.isbn 
    document.getElementById('autor').value = livro.autor 
    document.getElementById('nome').dataset.index = livro.index
}

const editLivro = (index) => {
    const livro = readLivro()[index]
    livro.index = index
    fillFields(livro)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editLivro(index)
        } else {
            const livro = readLivro()[index]
            let avisoDelete = document.querySelector('#avisoDelete')

            avisoDelete.textContent = `Deseja realmente excluir o livro ${livro.nome}`
            openModal2()

        // APAGAR O REGISTRO
            document.getElementById('apagar').addEventListener('click', () => {
                deleteLivro(index)
                updateTable()
                closeModal2()
            })
        }
    }
}

updateTable()

// Eventos
document.getElementById('cadastrarLivro')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

// modal apagar
document.getElementById('modalClose2')
    .addEventListener('click', closeModal2)

document.getElementById('salvar')
    .addEventListener('click', saveLivro)

document.querySelector('#tableLivro>tbody')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)

// modal apagar
document.getElementById('cancelar2')
    .addEventListener('click', closeModal2)
