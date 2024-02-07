document.addEventListener('DOMContentLoaded', function() {

    var form = document.getElementById('form');
    var name = document.getElementById('name');

    form.addEventListener('submit', function() {
        if (name.value) {
            sessionStorage.setItem('username', name.value);
            name.value = '';
        }
    });
});
