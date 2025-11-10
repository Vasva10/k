import './style.css'

let pole = [null, null, null, null, null, null, null, null, null]

let hoditKrestik = true

let pobeditel = null

const root = document.getElementById('root')

function sozdatIgru() {
  const igra = document.createElement('div')
  igra.className = 'igra'
  
  const zagolovok = document.createElement('h1')
  zagolovok.textContent = 'Крестики-Нолики'
  igra.appendChild(zagolovok)
  
  const status = document.createElement('div')
  status.className = 'status'
  status.id = 'status'
  igra.appendChild(status)
  
  const poleContainer = document.createElement('div')
  poleContainer.className = 'pole'
  
  for (let i = 0; i < 9; i++) {
    const kletka = document.createElement('button')
    kletka.className = 'kletka'
    kletka.id = 'kletka-' + i
    kletka.addEventListener('click', function() {
      handleClick(i)
    })
    poleContainer.appendChild(kletka)
  }
  
  igra.appendChild(poleContainer)
  
  const knopka = document.createElement('button')
  knopka.className = 'knopka'
  knopka.textContent = 'Начать заново'
  knopka.addEventListener('click', nachatZanovo)
  igra.appendChild(knopka)
  
  root.appendChild(igra)
}

function obnovitOtobrazhenie() {
  const statusElement = document.getElementById('status')
  let statusText
  
  if (pobeditel) {
    statusText = 'Победитель: ' + pobeditel
  } else {
    let vseZapolneno = true
    for (let i = 0; i < pole.length; i++) {
      if (pole[i] === null) {
        vseZapolneno = false
        break
      }
    }
    
    if (vseZapolneno) {
      statusText = 'Ничья!'
    } else {
      statusText = 'Ходит: ' + (hoditKrestik ? 'X' : 'O')
    }
  }
  
  statusElement.textContent = statusText
  
  for (let i = 0; i < 9; i++) {
    const kletka = document.getElementById('kletka-' + i)
    kletka.textContent = pole[i] || ''
    
    if (pole[i] !== null || pobeditel !== null) {
      kletka.disabled = true
    } else {
      kletka.disabled = false
    }
  }
}

function handleClick(index) {
  if (pole[index] !== null || pobeditel !== null) {
    return
  }
  
  if (hoditKrestik) {
    pole[index] = 'X'
  } else {
    pole[index] = 'O'
  }
  
  hoditKrestik = !hoditKrestik
  
  pobeditel = proveritPobeditelya()
  
  obnovitOtobrazhenie()
}

function proveritPobeditelya() {
  const kombinacii = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  
  for (let i = 0; i < kombinacii.length; i++) {
    const a = kombinacii[i][0]
    const b = kombinacii[i][1]
    const c = kombinacii[i][2]
    
    if (pole[a] !== null && pole[a] === pole[b] && pole[a] === pole[c]) {
      return pole[a]
    }
  }
  
  return null
}

function nachatZanovo() {
  pole = [null, null, null, null, null, null, null, null, null]
  hoditKrestik = true
  pobeditel = null
  
  obnovitOtobrazhenie()
}

sozdatIgru()
obnovitOtobrazhenie()
