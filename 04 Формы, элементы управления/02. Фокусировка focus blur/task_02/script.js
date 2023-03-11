'use strict';

let table = document.getElementById('bagua-table');

let cellEditing = false;

document.addEventListener('click', event => {
    console.log(Date.now(), cellEditing);

    if (cellEditing) {
        return;
    }

    const td = event.target.closest('td');

    if (td && table.contains(td) && !td.classList.contains('td-edit')) {
        cellEditing = true;

        const textarea = document.createElement('textarea');
        textarea.className = 'edit';
        textarea.value = td.innerHTML;
        textarea.value = textarea.value.replace(/\s+/g, ' ');

        textarea.style.width = td.offsetWidth + 'px';
        textarea.style.height = td.offsetHeight + 'px';
        const cellInnerHTML = td.innerHTML;
        td.innerHTML = '';
        td.classList.add('td-edit');
        td.append(textarea);

        const buttonsHolder = document.createElement('div');
        buttonsHolder.className = 'buttons-holder';

        const buttonOk = document.createElement('button');
        const buttonCancel = document.createElement('button');
        buttonOk.textContent = 'OK';
        buttonCancel.textContent = 'CANCEL';

        const endEdit = () => {
            console.log('endEdit')

            buttonsHolder.remove();
            textarea.remove();
            td.classList.remove('td-edit');
            cellEditing = false;
        };

        buttonOk.onclick = () => {
            endEdit();
            td.innerHTML = textarea.value;
        };

        buttonCancel.onclick = () => {
            endEdit();
            td.innerHTML = cellInnerHTML;
        };

        buttonsHolder.append(buttonOk);
        buttonsHolder.append(buttonCancel);

        const tdRect = td.getBoundingClientRect();

        buttonsHolder.style.left = tdRect.left + window.pageXOffset + 'px';
        buttonsHolder.style.top = tdRect.top + window.pageYOffset + td.offsetHeight + 'px';

        document.body.append(buttonsHolder);

        textarea.focus();
    }
});