// js/airtable.js

const base = window.airtableBase;

// Carregar tipos de mapas
function loadMapTypes() {
    showLoading('map-types-loading');

    base(TABLES.MAP_TYPES).select({
        view: 'Grid view'
    }).eachPage(function page(records, fetchNextPage) {
        const mapTypes = records.map(record => ({
            id: record.id,
            name: record.get('Nome'),
            value: record.get('Valor')
        }));

        updateMapTypesUI(mapTypes);
        fetchNextPage();
    }, function done(err) {
        hideLoading('map-types-loading');
        if (err) {
            console.error('Erro ao carregar tipos de mapas:', err);
            showToast('Erro ao carregar tipos de mapas', 'error');
        }
    });
}

// Adicionar tipo de mapa
function addMapType(mapTypeData) {
    base(TABLES.MAP_TYPES).create({
        'Nome': mapTypeData.name,
        'Valor': mapTypeData.value
    }, (err) => {
        if (err) {
            console.error('Erro ao adicionar tipo de mapa:', err);
            showToast('Erro ao adicionar tipo de mapa', 'error');
            return;
        }

        showToast('Tipo de mapa adicionado com sucesso!', 'success');
        loadMapTypes();
    });
}

// Atualizar tipo de mapa
function updateMapType(id, mapTypeData) {
    base(TABLES.MAP_TYPES).update(id, {
        'Nome': mapTypeData.name,
        'Valor': mapTypeData.value
    }, (err) => {
        if (err) {
            console.error('Erro ao atualizar tipo de mapa:', err);
            showToast('Erro ao atualizar tipo de mapa', 'error');
            return;
        }

        showToast('Tipo de mapa atualizado com sucesso!', 'success');
        loadMapTypes();
    });
}

// Excluir tipo de mapa
function deleteMapType(id) {
    base(TABLES.MAP_TYPES).destroy(id, (err) => {
        if (err) {
            console.error('Erro ao excluir tipo de mapa:', err);
            showToast('Erro ao excluir tipo de mapa', 'error');
            return;
        }

        showToast('Tipo de mapa excluído com sucesso!', 'success');
        loadMapTypes();
    });
}

