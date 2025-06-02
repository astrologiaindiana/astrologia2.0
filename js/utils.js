function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');

    const iconClassMap = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    toastMessage.textContent = message;
    toastIcon.className = `fas ${iconClassMap[type] || 'fa-info-circle'} ${type}`;
    toast.classList.add('active');

    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

function showLoading(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('hidden');
    const empty = document.getElementById(id.replace('loading', 'empty'));
    if (empty) empty.classList.add('hidden');
}

function hideLoading(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
}

function exportTableToCSV(tableId, filename) {
    const table = document.getElementById(tableId);
    if (!table) return showToast('Tabela não encontrada', 'error');

    const rows = [];
    table.querySelectorAll('tr').forEach(tr => {
        const row = [];
        tr.querySelectorAll('th, td').forEach(td => {
            const text = td.innerText.replace(/"/g, '""');
            row.push(`"${text}"`);
        });
        rows.push(row.join(','));
    });

    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    link.click();
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').then(() => {
        console.log('Service Worker registrado com sucesso!');
    }).catch(error => {
        console.error('Erro ao registrar Service Worker:', error);
    });
}

