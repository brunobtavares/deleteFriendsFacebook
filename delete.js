function getIDs() {
  var divID = document.getElementsByClassName(
    '_42ft _4jy0 _55pi _2agf _4o_4 FriendRequestFriends friendButton enableFriendListFlyout _4jy3 _517h _51sy'
  );
  var lista = [];

  var elements = document.querySelectorAll('._42ft');
  elements.forEach(function (element) {
    var userID = String(element.getAttribute('data-profileid'));
    if (userID.length == 15 && !lista.includes(userID)) {
      lista.push(userID);
      console.log(userID);
    }
  });

  console.log(lista.length + ' selecionados');
}

function remover() {
  var elements = document.querySelectorAll('.ckDelete:checked');
  elements.forEach(function (element) {
    var id = String(element.getAttribute('id'));
    console.log('Removido => ' + id);

    var rm = document.createElement('script');
    rm.innerHTML =
      "new AsyncRequest().setURI('/ajax/profile/removefriendconfirm.php').setData({ uid: " +
      id +
      ',norefresh:true }).send();';
    document.body.appendChild(rm);

    element.parentElement.remove();
  });

  countSelecionados();
}

function countSelecionados() {
  var qtdeSelecionados = 0;
  var elements = document.querySelectorAll('.ckDelete:checked');
  qtdeSelecionados = elements.length;

  document.getElementById('pid').innerHTML = qtdeSelecionados + ' selecionados';
}

function createView() {
  var div = document.createElement('DIV');
  div.innerHTML =
    '<small title="FECHAR" onclick="location.reload();" style="width: auto;position: absolute;top: -18px;left: 145px;cursor:pointer;padding: 0.5%;color: red;font-weight: bolder;">X</small>';
  div.style.background = '#4267B2';
  div.style.display = 'inline-block';
  div.style.padding = '0.5%';
  div.style.position = 'absolute';
  div.style.top = '340px';
  div.style.left = '940px';
  div.id = 'divView';

  var p = document.createElement('P');
  p.id = 'pid';
  p.style.color = '#ffffff';
  p.style.fontFamily = 'sans-serif';
  p.style.margin = '0';
  p.style.marginBottom = '5%';

  var btn = document.createElement('BUTTON');
  btn.style.fontFamily = 'sans-serif';
  btn.innerHTML = 'Remover Selecionados';
  btn.onclick = function () {
    remover();
  };

  div.appendChild(p);
  div.appendChild(btn);

  document.body.appendChild(div);

  var scrollingDiv = document.getElementById('divView');
  window.addEventListener('scroll', function () {
    scrollingDiv.style.marginTop = window.scrollY + 'px';
  });
}

function addCheckBox() {
  try {
    // Remove os checkbox para não duplicar
    var divsToRemove = document.querySelectorAll('.divDelete');
    divsToRemove.forEach(function (div) {
      div.remove();
    });

    var links = document.querySelectorAll('.fsl > a');
    links.forEach(function (link) {
      var dataGt = link.getAttribute('data-gt');
      if (dataGt !== null) {
        var atributos = JSON.parse(dataGt);
        var id = atributos.engagement.eng_tid;
        var div = document.createElement('div');
        div.className = 'divDelete';
        div.innerHTML = '<input onclick="countSelecionados()" type="checkbox" id="' + id + '" class="ckDelete">';
        link.after(div);
      } else {
        link.style.color = 'white';
        link.style.background = 'red';
        var auxid = link.getAttribute('ajaxify').replace('/ajax/friends/inactive/dialog?id=', '');
        var div = document.createElement('div');
        div.className = 'divDelete';
        div.innerHTML =
          '<input onclick="countSelecionados()" type="checkbox" id="' +
          auxid +
          '" class="ckDelete" checked> <small>Conta desativada</small>';
        link.after(div);
      }
    });
  } catch (e) {
    console.log('fun addCheckBox => ' + e);
  }
}

createView();
addCheckBox();
countSelecionados();

// Segue na tela
window.addEventListener('scroll', function () {
  var scrollingDiv = document.getElementById('divView');
  scrollingDiv.style.marginTop = window.scrollY + 'px';

  addCheckBox();
  countSelecionados();
});
