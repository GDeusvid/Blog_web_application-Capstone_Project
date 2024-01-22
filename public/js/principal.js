// INICIO

$('.edit_nome_sobre').hide();
$('.escreverDigitarGERAL').hide();
// $('#botao__reexibir').hide();
$('#botao__reexibir').css('visibility', 'hidden');


// delete all
$('#delete-all-btn').on('click', function(){
  location.reload();
});
// Tutorial
$('#tuto-btn').on('click', function(){
  window.open('https://github.com/GDeusvid', '_blank');
});
//Sobre mim
$('#sobrecriador-btn').on('click', function(){
  window.open('https://github.com/GDeusvid', '_blank');
}); 

// CLIQUE
$('.botaoedit_nome_sobre').on('click',()=>{
    $('.edit_nome_sobre').hide();
    var nameuser=$('#nomeUser').val();
    var biouser=$('#bioUser').val(); 
    if (biouser==''){
                biouser='Escreva sua bio...';
            };
            if (nameuser==''){
                nameuser='Seu nome...';
            }
    var dadosuser={nameuser:nameuser,biouser:biouser};

    // $.post( "/as", dadosuser );

    $.ajax({
        url: "http://localhost:3000/userinfo",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(dadosuser),
        success: function(data) {
            // console.log("Solicitação POST bem-sucedida", data);
            // console.log(dadosuser);
            
            $('.descricao p').text(biouser);
            $('.seunome h2').text(nameuser);
            
        },
        error: function(error) {
            console.error("Erro na solicitação POST", error);
        }
    });
});






// Modo noturno
function toggleSlider(element) {
    element.classList.toggle('active');
    
}
$('.slider-container').on('click',function(){
 console.log() ;
 if ($('.slider-container').hasClass('active')){
  $('.conteudo').addClass('darkmode');
  $('body').css('background','rgba(22, 22, 22, .9)');
  for (let i=1;i<100;i++){
    
    if($(`#post-${i} .titulo_post h2`).css('color')=='rgb(0, 0, 0)'){
      
      $(`#post-${i} .titulo_post h2`).css('color','white');
    };

    if($(`#post-${i} .mensagem_post p`).css('color')=='rgb(0, 0, 0)'){
      $(`#post-${i} .mensagem_post p`).css('color','white');
    };
  }

 } else{
  $('.conteudo').removeClass('darkmode');
  $('body').css('background','rgba(71,79,154,0.8)');
  $('body').css('background','linear-gradient(180deg,rgba(71,79,154,0.8) 0%, rgba(255,102,34,0.58) 80%)');
  $('body').css('background','-webkit-linear-gradient(180deg,rgba(71,79,154,0.8) 0%, rgba(255,102,34,0.58) 80%)');
  $('body').css('background','-moz-linear-gradient(180deg,rgba(71,79,154,0.8) 0%, rgba(255,102,34,0.58) 80%)');
  
  for (let i=1;i<100;i++){
    
    if($(`#post-${i} .titulo_post h2`).css('color')=='rgb(255, 255, 255)'){
      $(`#post-${i} .titulo_post h2`).css('color','black');
    };

    if($(`#post-${i} .mensagem_post p`).css('color')=='rgb(255, 255, 255)'){
      $(`#post-${i} .mensagem_post p`).css('color','black');
    };
  }
  // console.log($('.titulo_post h2').css('color'));
  // if($('.titulo_post h2').css('color')=='black'){

  // }


 }
 
});




function deleteAllItems() {
    // Adicione aqui a lógica para excluir todos os itens
    alert("Todos os itens foram excluídos!");
}




$(document).on('click', '.conteudo_lembrete', function() {
    
    var urlID=`#post-${$(this).attr('class').split(' ')[1].split('')[1]}`
    
    window.location.href = urlID;
});



// PESQUISAR BOTAO
$('#botao__pesquisar').on('click', function() {
    $('#botao__reexibir').css('visibility', 'visible');
    // Capturar o termo de pesquisa
    var termoPesquisa = $('#search').val().toLowerCase();

    // Iterar sobre cada post
    $('.post').each(function() {
      var conteudoPost = $(this).find('.mensagem_post').text().toLowerCase();
      var tituloPost= $(this).find('.titulo_post').text().toLowerCase();

      // Verificar se o termo de pesquisa está no conteúdo do post
      if (conteudoPost.includes(termoPesquisa) || tituloPost.includes(termoPesquisa)) {
        // Se encontrado, exibir o post
        $('.post').hide();
        $(this).show();
        console.log("achei");
        console.log($(this).attr('class'));
      } else {
        // Se não encontrado, ocultar o post
        
        console.log("nao achei");
      }
    });
  });

  $('#botao__reexibir').on('click',function(){
    $('#botao__reexibir').css('visibility', 'hidden');
    $('.post').show();
    $('#search').val('');
  });


