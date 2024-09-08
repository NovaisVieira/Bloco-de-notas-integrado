document.addEventListener('DOMContentLoaded', function () {
    const addTabButton = document.getElementById('add-tab');
    const deleteTabButton = document.getElementById('delete-tab');
    const tabsNavContainer = document.getElementById('tabs-nav-container');
    const tabsContainer = document.getElementById('tabs-container');
  
    function toggleTab(tabNumber) {
      const tabWrappers = document.querySelectorAll('.tab-wrapper');
      tabWrappers.forEach(wrapper => {
        const tabWrapper = wrapper;
        if (tabWrapper.getAttribute('data-tab') === tabNumber.toString()) {
          tabWrapper.classList.add('active');
        } else {
          tabWrapper.classList.remove('active');
        }
      });
  
      // Adicionar a classe ativa ao botão de navegação correspondente
      const navButtons = document.querySelectorAll('.nav-button');
      navButtons.forEach(button => {
        if (button.getAttribute('data-tab') === tabNumber.toString()) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });
    }
  
    function addNewTab() {
      const newTabNumber = document.querySelectorAll('.tab-wrapper').length + 1;
      const tabWrapper = document.createElement('div');
      tabWrapper.classList.add('tab-wrapper');
      tabWrapper.setAttribute('data-tab', newTabNumber);
  
      tabWrapper.innerHTML = `
        <input type="text" class="tab-title" placeholder=" Nome " />
        <div class="tab-content">
          <textarea placeholder="Escreva sua nota aqui..."></textarea>
          <button class="save-note">Salvar</button>
        </div>
      `;
  
      const navButton = document.createElement('button');
      navButton.classList.add('nav-button');
      navButton.setAttribute('data-tab', newTabNumber);
      navButton.textContent = ` NOTA ${newTabNumber}`;
      navButton.addEventListener('click', function() {
        toggleTab(newTabNumber);
      });
  
      tabsNavContainer.appendChild(navButton);
      tabsContainer.appendChild(tabWrapper);
      navButton.click(); // Inicializar a aba recém-adicionada
    }
  
    function deleteCurrentTab() {
      const activeTabButton = document.querySelector('.nav-button.active');
      if (!activeTabButton) return;
  
      const activeTabNumber = activeTabButton.getAttribute('data-tab');
      const activeTab = document.querySelector(`.tab-wrapper[data-tab="${activeTabNumber}"]`);
  
      if (activeTab) {
        activeTab.remove();
        activeTabButton.remove();
  
        // Selecionar a última aba visível restante, se houver
        const remainingTabs = document.querySelectorAll('.tab-wrapper');
        if (remainingTabs.length > 0) {
          // Selecionar a última aba restante
          const newActiveTabNumber = remainingTabs[remainingTabs.length - 1].getAttribute('data-tab');
          document.querySelector(`.nav-button[data-tab="${newActiveTabNumber}"]`).click();
        }
      }
    }
  
    addTabButton.addEventListener('click', addNewTab);
    deleteTabButton.addEventListener('click', deleteCurrentTab);
  
    // Inicializar com uma aba
    if (document.querySelectorAll('.tab-wrapper').length === 0) {
      addNewTab(); // Adicionar uma aba inicial se nenhuma existir
    } else {
      document.querySelectorAll('.tab-wrapper')[0].querySelector('.tab-title').click(); // Selecionar a primeira aba se houver
    }
  });
  