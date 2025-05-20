function getChartTypes() {
    const uppercase = document.querySelector('#incluide_uppercase').checked;
    const lowercase = document.querySelector('#incluide_lowercase').checked;
    const number = document.querySelector('#incluide_number').checked;
    const specialCharacter = document.querySelector('#incluide_special_character').checked;

    const chartTypes = [];

    if (uppercase) {
        chartTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }
    if (lowercase) {
        chartTypes.push('abcdefghijklmnopqrstuvwxyz');
    }
    if (number) {
        chartTypes.push('0123456789');
    }
    if (specialCharacter) {
        chartTypes.push('!@#$%&*()_{}[]+<;>?');
    }



    return chartTypes;
}

function getPasswordSize() {
    const size = document.querySelector('#size').value
    if (isNaN(size) || size < 4 || size > 50) {
        message('Tamanho invalido, digite um valor entre 4 e 50. ', 'warning')


    }
    return size
}



function randomCharType(chartTypes) {
    const randomIndex = Math.floor(Math.random() * chartTypes.length);


    return chartTypes[randomIndex][Math.floor(Math.random() * chartTypes[randomIndex].length)]
}

function generatePassword(size, chartTypes) {
    let passwordGenerated = ''

    while (passwordGenerated.length < size) {
        passwordGenerated += randomCharType(chartTypes)
    }

    return passwordGenerated
}

function message(text, status = 'success') {
    Toastify({
        text: text,
        duration: 2000,
        style: {
            background: status === 'success' ? '#84cc16' : '#dc2626',
            boxShadow: 'none'

        }
    }).showToast()
}


document.querySelector('#generate').addEventListener('click', function () {
    const size = getPasswordSize()
    const chartTypes = getChartTypes()


    if (!size) {
        return
    }

    if (!chartTypes.length) {
        message('Selecione pelo menos um tipo de caractere!', 'warning')
        return
    }

    const passwordGenerated = generatePassword(size, chartTypes)

    document.querySelector('#password_container').classList.add('show')
    document.querySelector('#password').textContent = passwordGenerated
})

document.querySelector('#copy').addEventListener('click', function () {
    navigator.clipboard.writeText(document.querySelector('#password').textContent)
    message('Senha copiada com sucesso!', 'success')
})
