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

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_aluno')) ?? []
const setLocalStorage = (dbAluno) => localStorage.setItem("db_aluno", JSON.stringify(dbAluno))

// CRUD - create read update delete
const deleteAluno = (index) => {
    const dbAluno = readAluno()
    dbAluno.splice(index, 1)
    setLocalStorage(dbAluno)
}

const updateAluno = (index, aluno) => {
    const dbAluno = readAluno()
    dbAluno[index] = aluno
    setLocalStorage(dbAluno)
}

const readAluno = () => getLocalStorage()

const createAluno = (aluno) => {
    const dbAluno = getLocalStorage()
    dbAluno.push (aluno)
    setLocalStorage(dbAluno)
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
const saveAluno = () => {
    debugger
    if (isValidFields()) {
        const aluno = {
            nome: document.getElementById('nome').value,
            matricula: document.getElementById('matricula').value,
            telefone: document.getElementById('telefone').value,
            celular: document.getElementById('celular').value,
            email: document.getElementById('email').value,
            rua: document.getElementById('rua').value,
            numero: document.getElementById('numero').value,
            complemento: document.getElementById('complemento').value,
            cidade: document.getElementById('cidade').value,
            estado: document.getElementById('estado').value,
            curso: document.getElementById('curso').value,
            serie: document.getElementById('serie').value
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            createAluno(aluno)
            updateTable()
            closeModal()
        } else {
            updateAluno(index, aluno)
            updateTable()
            closeModal()
        }
    }
}

//Tabela de Apresentação
const createRow = (aluno, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${aluno.nome}</td>
        <td>${aluno.matricula}</td>
        <td>${aluno.curso}</td>
        <td>${aluno.serie}</td>
        <td>${aluno.celular}</td>
        <td>${aluno.email}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tableAluno>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableAluno>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbAluno = readAluno()
    clearTable()
    dbAluno.forEach(createRow)
}

//Apresentação tabela modal
const fillFields = (aluno) => {
    document.getElementById('nome').value = aluno.nome
    document.getElementById('matricula').value = aluno.matricula
    document.getElementById('telefone').value = aluno.telefone
    document.getElementById('celular').value = aluno.celular
    document.getElementById('email').value = aluno.email
    document.getElementById('rua').value = aluno.rua
    document.getElementById('numero').value = aluno.numero
    document.getElementById('complemento').value = aluno.complemento
    document.getElementById('cidade').value = aluno.cidade
    document.getElementById('estado').value = aluno.estado
    document.getElementById('curso').value = aluno.curso
    document.getElementById('serie').value = aluno.serie   

    document.getElementById('nome').dataset.index = aluno.index
}

const editAluno = (index) => {
    const aluno = readAluno()[index]
    aluno.index = index
    fillFields(aluno)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editAluno(index)
        } else {
            const aluno = readAluno()[index]
            let avisoDelete = document.querySelector('#avisoDelete')

            avisoDelete.textContent = `Deseja realmente excluir o aluno ${aluno.nome}`
            openModal2()

        // APAGAR O REGISTRO
            document.getElementById('apagar').addEventListener('click', () => {
                deleteAluno(index)
                updateTable()
                closeModal2()
            })
        }
    }
}

updateTable()

// Eventos
document.getElementById('cadastrarAluno')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

// modal apagar
document.getElementById('modalClose2')
    .addEventListener('click', closeModal2)

document.getElementById('salvar')
    .addEventListener('click', saveAluno)

document.querySelector('#tableAluno>tbody')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)

// modal apagar
document.getElementById('cancelar2')
    .addEventListener('click', closeModal2)

