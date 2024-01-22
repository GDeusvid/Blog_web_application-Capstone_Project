// CLIQUES
$('.editbotao').on('click',()=>{
    $('.edit_nome_sobre').show();
});

$('.fotoPerfil').on('click',()=>{
    $('#fileInputprofile').click();
});

$('#fileInputprofile').on('change', function (event) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
        // Exibir uma prévia da imagem
        const profileImage = $('#profileImage');
        profileImage.attr('src', URL.createObjectURL(file));

        // Aqui você pode enviar a imagem para o servidor
        // usando uma solicitação AJAX ou outro método.
        // Exemplo: enviarImagemParaServidor(file);
    }
}); 