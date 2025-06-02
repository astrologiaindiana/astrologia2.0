// utils.js

// Formatar data
function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Formatar data e hora
function formatDateTime(dateTime) {
  const d = new Date(dateTime);
  const date = formatDate(d);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${date} ${hours}:${minutes}`;
}

// Formatar valor monetário
function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

// Formatar número de telefone para WhatsApp
function formatWhatsAppNumber(number) {
  const cleanNumber = number.replace(/\D/g, '');
  if (cleanNumber.startsWith('55')) {
    return cleanNumber;
  }
  return `55${cleanNumber}`;
}

// Abrir WhatsApp
function openWhatsApp(number, message = '') {
  const formattedNumber = formatWhatsAppNumber(number);
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
  window.open(url, '_blank');
}

// Mostrar toast de notificação
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');

  let iconClass = 'fa-info-circle';
  if (type === 'success') iconClass = 'fa-check-circle';
  if (type === 'error') iconClass = 'fa-times-circle';
  if (type === 'warning') iconClass = 'fa-exclamation-triangle';

  toastMessage.textContent = message;
  toastIcon.className = `fas ${iconClass} ${type}`;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 3000);
}

// Mostrar loading
function showLoading(id) {
  const element = document.getElementById(id);
  if (element) element.classList.remove('hidden');

  const emptyId = id.replace('loading', 'empty');
  const emptyElement = document.getElementById(emptyId);
  if (emptyElement) emptyElement.classList.add('hidden');
}

// Esconder loading
function hideLoading(id) {
  const element = document.getElementById(id);
  if (element) element.classList.add('hidden');
}

// Mostrar empty state
function showEmptyState(id) {
  const element = document.getElementById(id);
  if (element) element.classList.remove('hidden');
}

// Esconder empty state
function hideEmptyState(id) {
  const element = document.getElementById(id);
  if (element) element.classList.add('hidden');
}

// Abrir modal
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
}

// Fechar modal
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}

// Gerar ID único
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Verificar se é dispositivo móvel
function isMobile() {
  return window.innerWidth <= 768;
}

// Exportar dados de tabela para CSV
function exportTableToCSV(tableId, filename) {
  const table = document.getElementById(tableId);
  if (!table) {
    showToast('Tabela não encontrada', 'error');
    return;
  }

  const headers = [];
  table.querySelectorAll('thead th').forEach(cell => {
    headers.push(cell.textContent.trim());
  });

  const rows = [];
  table.querySelectorAll('tbody tr').forEach(row => {
    const rowData = [];
    row.querySelectorAll('td').forEach(cell => {
      if (!cell.querySelector('button')) {
        rowData.push(cell.textContent.trim());
      }
    });
    rows.push(rowData);
  });

  let csvContent = headers.join(',') + '\n';
  rows.forEach(row => {
    const formattedRow = row.map(cell => `"${cell.replace(/"/g, '""')}"`);
    csvContent += formattedRow.join(',') + '\n';
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Registrar o service worker (corrigido para GitHub Pages)
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch(error => {
        console.error('Erro ao registrar Service Worker:', error);
      });
  }
}
