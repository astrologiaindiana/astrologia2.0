// Implementar função loadFinancialData que estava faltando
function loadFinancialData(period = 'day', date = new Date()) {
  showLoading('financial-loading');
  
  // Construir filtro para o Airtable
  let filterFormula = '';
  let startDate, endDate;
  
  if (period === 'day') {
    const formattedDate = formatDate(date);
    filterFormula = `DATETIME_FORMAT({Data da Compra}, 'YYYY-MM-DD') = '${formattedDate}'`;
  } else if (period === 'week') {
    startDate = new Date(date);
    startDate.setDate(date.getDate() - date.getDay());
    endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    
    filterFormula = `AND(
      DATETIME_FORMAT({Data da Compra}, 'YYYY-MM-DD') >= '${formatDate(startDate)}',
      DATETIME_FORMAT({Data da Compra}, 'YYYY-MM-DD') <= '${formatDate(endDate)}'
    )`;
  } else if (period === 'month') {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    
    filterFormula = `AND(
      YEAR({Data da Compra}) = ${year},
      MONTH({Data da Compra}) = ${month}
    )`;
  }
  
  const queryOptions = {
    view: 'Grid view',
    filterByFormula: filterFormula
  };
  
  window.airtableBase(TABLES.ORDERS).select(queryOptions).eachPage(
    function page(records, fetchNextPage) {
      const orders = records.map(record => ({
        id: record.id,
        clientName: record.get('Nome do Cliente'),
        purchaseDate: record.get('Data da Compra'),
        mapType: record.get('Tipo de Mapa'),
        responsible: record.get('Responsável'),
        status: record.get('Status'),
        value: record.get('Valor')
      }));
      
      updateFinancialUI(orders, period, date);
      fetchNextPage();
    },
    function done(err) {
      hideLoading('financial-loading');
      if (err) {
        console.error('Erro ao carregar dados financeiros:', err);
        showToast('Erro ao carregar dados financeiros', 'error');
      }
    }
  );
}