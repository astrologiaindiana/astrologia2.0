const base = airtableBase;

function loadMapTypes() {
    showLoading('map-types-loading');
    base(TABLES.MAP_TYPES).select({ view: 'Grid view' }).eachPage(
        (records, fetchNextPage) => {
            const mapTypes = records.map(r => ({
                id: r.id,
                name: r.get('Nome'),
                value: r.get('Valor')
            }));
            updateMapTypesUI(mapTypes);
            fetchNextPage();
        },
        err => {
            hideLoading('map-types-loading');
            if (err) {
                console.error('Erro ao carregar tipos de mapas:', err);
                showToast('Erro ao carregar tipos de mapas', 'error');
            }
        }
    );
}

function addMapType(mapTypeData) {
    base(TABLES.MAP_TYPES).create({
        'Nome': mapTypeData.name,
        'Valor': mapTypeData.value
    }, err => {
        if (err) {
            console.error('Erro ao adicionar tipo de mapa:', err);
            return showToast('Erro ao adicionar tipo de mapa', 'error');
        }
        showToast('Tipo de mapa adicionado com sucesso!', 'success');
        loadMapTypes();
    });
}

function updateMapType(id, mapTypeData) {
    base(TABLES.MAP_TYPES).update(id, {
        'Nome': mapTypeData.name,
        'Valor': mapTypeData.value
    }, err => {
        if (err) {
            console.error('Erro ao atualizar tipo de mapa:', err);
            return showToast('Erro ao atualizar tipo de mapa', 'error');
        }
        showToast('Tipo de mapa atualizado com sucesso!', 'success');
        loadMapTypes();
    });
}

function deleteMapType(id) {
    base(TABLES.MAP_TYPES).destroy(id, err => {
        if (err) {
            console.error('Erro ao excluir tipo de mapa:', err);
            return showToast('Erro ao excluir tipo de mapa', 'error');
        }
        showToast('Tipo de mapa excluído com sucesso!', 'success');
        loadMapTypes();
    });
}
