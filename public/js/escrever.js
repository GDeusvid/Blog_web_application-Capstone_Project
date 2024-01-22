// INICIO




// CLIQUES
$('.abaescrever').on('click',()=>{
    $('.escrevercontainer').hide();
    $('.escreverDigitarGERAL').fadeIn();
    $('#editNote').hide();
    $('#createNote').show();
    $('.textonormal').css('background-color','#d3d3d3');
    $('#titleNote').val('');
    $('#messageNote').val('');
    srcimagepost='';
    
});
$('.simbolofechar').on('click',()=>{
    $('.escreverDigitarGERAL').hide();
    $('.escrevercontainer').fadeIn();
});

var cordotexto='black';
$('.corestexto').on('click',function(){
    $('.corestexto').css('background-color','transparent');
    $(this).css('background-color','#d3d3d3');
    cordotexto=$(this).attr('class').split(' ')[0];
    
    switch (cordotexto){
        case 'textovermelho':
             cordotexto='rgb(235, 31, 31)';
        break;
        case 'textoamarelo':
             cordotexto='rgb(255 255 0)';
        break;
        case 'textoverde':
             cordotexto='rgb(7 141 7)';
        break;
        case 'textonormal':
             cordotexto='black';
        break;

        case 'rgb(235, 31, 31)':
             cordotexto='rgb(235, 31, 31)';
        break;
        case 'rgb(255 255 0)':
             cordotexto='rgb(255 255 0)';
        break;
        case 'rgb(7 141 7)':
             cordotexto='rgb(7 141 7)';
        break;
        case 'black':
             cordotexto='black';
        break;
    }
    
});



$('#addimage-btn').on('click',()=>{
    $('#fileInputimagepost').click();
});
var srcimagepost='';
$('#fileInputimagepost').on('change', function (event) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
        // Exibir uma prévia da imagem
        const profileImage = $('#imagemdopost');
        profileImage.attr('src', URL.createObjectURL(file));
        srcimagepost=URL.createObjectURL(file);
        // Aqui você pode enviar a imagem para o servidor
        // usando uma solicitação AJAX ou outro método.
        // Exemplo: enviarImagemParaServidor(file);
    }
});


var countNewPostCliente=0;
var countNewLembreteCliente=0;
$('#createNote').on('click',function(){
    $('.corestexto').css('background-color','transparent');
    

    var tituloNote=$('#titleNote').val();
    var mensagemNote=$('#messageNote').val();
    var dataatual={dia:new Date().getDate(),mes:new Date().getMonth()+1,ano: new Date().getFullYear(),hora:`${new Date().getHours()}:${new Date().getMinutes()}`};
    

     
    if (tituloNote != '' && mensagemNote != ''){
        $('.escreverDigitarGERAL').hide();  
        $('.escrevercontainer').fadeIn();
        countNewPostCliente=countNewPostCliente+1;

        var dadosNewPost = {};
        dadosNewPost[`post-${countNewPostCliente}`] = {
            tituloNote: tituloNote,
            mensagemNote: mensagemNote,
            cordotexto:cordotexto,
            srcimagepost:srcimagepost,
        };

        $.ajax({
        url: "http://localhost:3000/newpost",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(dadosNewPost),
        success: function(data) {
            // console.log("Solicitação POST bem-sucedida", data);
            // console.log(dadosuser);
            
            
            $('.container_post').prepend(`<div class="post" id="post-${countNewPostCliente}">
            <div class="mod_post">
                <div class="delete_post delete_post-${countNewPostCliente}">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                      </svg>
                </div>
                <div class="edit_post edit_post-${countNewPostCliente}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                      </svg>
                </div>
    
            </div>
            
            <div class="titulo_post">
              <h2 style="color: ${cordotexto};">${tituloNote}</h2>  
            </div>
            
            <div class="mensagem_post">
              <p style="color: ${cordotexto};">${mensagemNote}</p>
      
            </div>
            <div class="image_post">
                <img src="${srcimagepost}" width="100%" alt="">
            </div>
            <div class="timer_post">
                <p>${dataatual.dia}/${dataatual.mes}/${dataatual.ano} às ${dataatual.hora}h</p>
            </div>
        </div>`);
        
        cordotexto='black';
        },
        error: function(error) {
            console.error("Erro na solicitação POST", error);
        }
        });
    
    if ($('#lembreteSouN').prop('checked')){
        countNewLembreteCliente=countNewLembreteCliente+1;
        $('.container_lembretes h3').after(`<div id="lembrete-${countNewLembreteCliente}" class="conteudo_lembrete n${countNewPostCliente}">

    
        <div class="titulo_lembrete">
            <p>${tituloNote}</p>
        </div>

        <div class="hora_lembrete">
            <p>${dataatual.dia}/${dataatual.mes}/${dataatual.ano} às ${dataatual.hora}h</p>
        </div>
    </div>`)
    };
    
    }; 
    
});



// EDITAR 
var posteditID='';
var nID='';
var dadospostedit={};
$(document).on('click', '.edit_post', function() {
    $('.escrevercontainer').hide();
    $('#createNote').hide();
    $('.textonormal').css('background-color','transparent');
    $('#editNote').show();
    $('.escreverDigitarGERAL').fadeIn();

    posteditID=`post-${$(this).attr('class').split(' ')[1].split('')[10]}`;
    nID=posteditID.split('')[5];
    dadospostedit={
        tituloNote: $(`#${posteditID} .titulo_post h2`).text(),
        mensagemNote: $(`#${posteditID} .mensagem_post p`).text(),
        cordotexto:$(`#${posteditID} .mensagem_post p`).css('color'),
        srcimagepost:$(`#${posteditID} .image_post img`).attr('src'),

    };
    
    $('#titleNote').val(dadospostedit.tituloNote);
    $('#messageNote').val(dadospostedit.mensagemNote);
    srcimagepost=dadospostedit.srcimagepost;
    cordotexto=dadospostedit.cordotexto;
    
    
    
});

$(document).on('click','#editNote',function(){
    
    
    var tituloNote=$('#titleNote').val();
    var mensagemNote=$('#messageNote').val();
    var dataatual={dia:new Date().getDate(),mes:new Date().getMonth()+1,ano: new Date().getFullYear(),hora:`${new Date().getHours()}:${new Date().getMinutes()}`};
    

     
    if (tituloNote != '' && mensagemNote != ''){
        $('.escreverDigitarGERAL').hide();  
        $('.escrevercontainer').fadeIn();
        console.log((`.n${nID}`));
        $(`.n${nID}`).remove();

        var dadosNewEdit = {};
        dadosNewEdit[`${posteditID}`] = {
            tituloNote: tituloNote,
            mensagemNote: mensagemNote,
            cordotexto:cordotexto,
            srcimagepost:srcimagepost
        
        };

        $.ajax({
        url: "http://localhost:3000/editpost",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(dadosNewEdit),
        success: function(data) {
            // console.log("Solicitação POST bem-sucedida", data);
            // console.log(dadosuser);
            
            
            $(`#${posteditID}`).html(`
            <div class="mod_post">
                <div class="delete_post delete_${posteditID}">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                      </svg>
                </div>
                <div class="edit_post edit_${posteditID}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                      </svg>
                </div>
    
            </div>
            
            <div class="titulo_post">
              <h2 style="color: ${cordotexto};">${tituloNote}</h2>  
            </div>
            
            <div class="mensagem_post">
              <p style="color: ${cordotexto};">${mensagemNote}</p>
      
            </div>
            <div class="image_post">
                <img src="${srcimagepost}" width="100%" alt="">
            </div>
            <div class="timer_post">
                <p>${dataatual.dia}/${dataatual.mes}/${dataatual.ano} às ${dataatual.hora}h</p>
            </div>
        `);
        
        },
        error: function(error) {
            console.error("Erro na solicitação POST", error);
        }
        });
    
    if ($('#lembreteSouN').prop('checked')){
        countNewLembreteCliente=countNewLembreteCliente+1;
        $('.container_lembretes h3').after(`<div id="lembrete-${countNewLembreteCliente}" class="conteudo_lembrete n${nID}">

    
        <div class="titulo_lembrete">
            <p>${tituloNote}</p>
        </div>

        <div class="hora_lembrete">
            <p>${dataatual.dia}/${dataatual.mes}/${dataatual.ano} às ${dataatual.hora}h</p>
        </div>
    </div>`)
    };
    }; 
});




// EXCLUIR
$(document).on('click', '.delete_post', function() {
    postdeleteID=`post-${$(this).attr('class').split(' ')[1].split('')[12]}`;
    console.log(postdeleteID);
    $(`#${postdeleteID}`).remove();
    ndeleteID=postdeleteID.split('')[5];
    $(`.n${ndeleteID}`).remove();
});