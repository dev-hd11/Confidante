function redirect_to_delete() {
    var result = confirm('This is a dangeorous action, you may lose all your data. Are you sure?')

    if (result) {
        window.location.href += 'del/'
    }
}

/* 
(C) 2023, Himank Deka.
 */