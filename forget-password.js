document.getElementById('fp-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Check your email for password reset link');
    this.reset();
});
