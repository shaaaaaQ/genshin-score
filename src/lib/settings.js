const defaultSettings = {
    calcTypes: [
        {
            label: '会心',
            rates: {
                'FIGHT_PROP_CRITICAL': 2,
                'FIGHT_PROP_CRITICAL_HURT': 1
            }
        },
        {
            label: '攻撃％',
            rates: {
                'FIGHT_PROP_CRITICAL': 2,
                'FIGHT_PROP_CRITICAL_HURT': 1,
                'FIGHT_PROP_ATTACK_PERCENT': 1
            }
        },
        {
            label: 'HP%',
            rates: {
                'FIGHT_PROP_CRITICAL': 2,
                'FIGHT_PROP_CRITICAL_HURT': 1,
                'FIGHT_PROP_HP_PERCENT': 1
            }
        }
    ]
};



function getObject() {
    const str = localStorage.getItem('settings');
    return str && JSON.parse(str) || {};
}

function setObject(obj) {
    localStorage.setItem('settings', JSON.stringify(obj));
}

function _get(key, obj) {
    const seg = key.split('.');
    let result;
    seg.forEach((key, index) => {
        if (seg.length === index + 1) {
            result = obj && obj[key];
        } else {
            obj = obj && obj[key];
        }
    });
    return result;
}

function _set(key, value) {
    const settings = getObject();
    const seg = key.split('.');
    let obj = settings;
    seg.forEach((key, index) => {
        if (seg.length === index + 1) {
            obj[key] = value;
        } else {
            if (!obj[key]) obj[key] = {};
            obj = obj[key];
        }
    });
    setObject(settings);
}

function get(key) {
    const settings = getObject();
    const result = _get(key, settings) || _get(key, defaultSettings);
    return result;
}

function set(key, value) {
    _set(key, value);
}

export default {
    get,
    set
};