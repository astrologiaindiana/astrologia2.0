// Funções utilitárias

function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatDateTime(dateTime) {
    const d = new Date(dateTime);
    const date = formatDate(d);
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${date} ${hours}:${minutes}`;
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function formatWhatsAppNumber(number) {
    const cleanNumber = number.replace(/\D/g, '');
    return cleanNumber.startsWith('55') ? cleanNumber : `55${cleanNumber}`;
}

function openWhatsApp(number, message = '') {
    const formattedNumber = formatWhatsAppNumber(number);
    const url = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    toastMessage.textContent = message;
    toastIcon.className = `fas ${icons[type] || icons.info} ${type}`;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3000);
}

function showLoading(id) {
    const el = document.getElementById(id);
    const empty = document.getElementById(id.replace('loading', 'empty'));
    if (el) el.classList.remove('hidden');
    if (empty) empty.classList.add('hidden');
}

function hideLoading(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
}

function showEmptyState(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('hidden');
}

function hideEmptyState(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
}

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('active');
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('active');
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function isMobile() {
    return window.innerWidth <= 768;
}

function exportTableToCSV(tableId, filename) {
    const table = document.getElementById(tableId);
    if (!table) return showToast('Tabela não encontrada', 'error');

    const headers = Array.from(table.querySelectorAll('thead th')).map(cell => cell.textContent.trim());
    const rows = Array.from(table.querySelectorAll('tbody tr')).map(row =>
        Array.from(row.querySelectorAll('td')).map(cell =>
            cell.querySelector('button') ? '' : `"${cell.textContent.trim().replace(/"/g, '""')}"`
        ).join(',')
    );

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => console.log('Service Worker registrado com sucesso:', registration))
        .catch(error => console.error('Erro ao registrar Service Worker:', error));
}
