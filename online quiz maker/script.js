// ---------- Mobile nav ----------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobilePanel = document.getElementById('mobilePanel');
  hamburgerBtn.addEventListener('click', () => mobilePanel.classList.toggle('open'));

  // ---------- Question bank ----------
  const categoryColors = {
    'General Knowledge': { bg:'rgba(94,146,118,0.16)', text:'#3F7456' },
    'Computer Science':  { bg:'rgba(28,107,122,0.16)', text:'#1C6B7A' },
    'HTML':              { bg:'rgba(226,117,74,0.16)', text:'#C45A33' },
    'CSS':               { bg:'rgba(28,107,122,0.16)', text:'#0F4C5C' },
    'JavaScript':        { bg:'rgba(201,138,27,0.18)', text:'#9C6B14' },
    'Python':            { bg:'rgba(94,146,118,0.16)', text:'#2F5C42' },
    'Databases':         { bg:'rgba(15,76,92,0.14)',  text:'#0F4C5C' },
    'Networking':        { bg:'rgba(226,117,74,0.16)', text:'#9C4A2C' },
    'Technology':        { bg:'rgba(81,98,95,0.14)',  text:'#445350' }
  };

  const questions = [
    { category:'HTML', question:'What does HTML stand for?', options:['Hyper Text Markup Language','High Text Machine Language','Hyperlink Markup Language','Home Tool Markup Language'], correct:0 },
    { category:'HTML', question:'Which HTML tag is used to create a hyperlink?', options:['<link>','<a>','<href>','<nav>'], correct:1 },
    { category:'HTML', question:'Which tag is used to define an internal style sheet in HTML?', options:['<css>','<script>','<style>','<format>'], correct:2 },
    { category:'HTML', question:'Which attribute provides alternate text for an image in HTML?', options:['title','src','alt','desc'], correct:2 },

    { category:'CSS', question:'Which language is used for styling web pages?', options:['XML','JSON','CSS','PHP'], correct:2 },
    { category:'CSS', question:'Which CSS property controls the text size?', options:['text-style','font-size','text-size','font-style'], correct:1 },
    { category:'CSS', question:'Which CSS property changes the background color of an element?', options:['color','bg-color','background-color','fill-color'], correct:2 },
    { category:'CSS', question:'Which CSS layout module is designed for one-dimensional layouts?', options:['Grid','Flexbox','Float','Table'], correct:1 },

    { category:'JavaScript', question:'Which company originally developed JavaScript?', options:['Microsoft','Netscape','Google','Apple'], correct:1 },
    { category:'JavaScript', question:'Which keyword declares a constant variable in JavaScript?', options:['var','let','const','static'], correct:2 },
    { category:'JavaScript', question:'Which method converts a JSON string into a JavaScript object?', options:['JSON.stringify()','JSON.parse()','JSON.toObject()','Object.fromJSON()'], correct:1 },
    { category:'JavaScript', question:'Which operator checks both value and type equality in JavaScript?', options:['==','=','===','!='], correct:2 },

    { category:'Python', question:'Which symbol is used to write comments in Python?', options:['//','#','/* */','--'], correct:1 },
    { category:'Python', question:'What is the correct file extension for Python files?', options:['.pt','.py','.pyt','.pyo'], correct:1 },
    { category:'Python', question:'Which function is used to display output in Python?', options:['echo()','print()','console.log()','display()'], correct:1 },

    { category:'Databases', question:'Which of these is a NoSQL database?', options:['MySQL','PostgreSQL','MongoDB','SQLite'], correct:2 },
    { category:'Databases', question:'What does SQL stand for?', options:['Structured Query Language','Sequential Query Logic','Simple Query Language','Structured Question Language'], correct:0 },
    { category:'Databases', question:'Which SQL command is used to retrieve data from a database?', options:['GET','FETCH','SELECT','RETRIEVE'], correct:2 },

    { category:'Networking', question:'What is the default port number for HTTP?', options:['21','80','443','8080'], correct:1 },
    { category:'Networking', question:'What does IP stand for in networking?', options:['Internet Protocol','Internal Process','Information Path','Internet Path'], correct:0 },
    { category:'Networking', question:'Which protocol is used to securely transfer data over the web?', options:['FTP','HTTP','HTTPS','SMTP'], correct:2 },

    { category:'Computer Science', question:'Which data structure follows First In First Out (FIFO) order?', options:['Stack','Queue','Tree','Graph'], correct:1 },
    { category:'Computer Science', question:'What does CPU stand for?', options:['Central Processing Unit','Computer Personal Unit','Central Program Utility','Core Processing Unit'], correct:0 },
    { category:'Computer Science', question:'Which of the following is NOT a sorting algorithm?', options:['Bubble Sort','Quick Sort','Binary Search','Merge Sort'], correct:2 },

    { category:'Technology', question:'What does "AI" stand for?', options:['Automated Input','Artificial Intelligence','Applied Informatics','Auto Integration'], correct:1 },
    { category:'Technology', question:'Which company developed the Android operating system?', options:['Apple','Google','Microsoft','Samsung'], correct:1 },
    { category:'Technology', question:'What does "IoT" stand for?', options:['Internet of Things','Input/Output Technology','Internet Online Tools','Integration of Tech'], correct:0 },

    { category:'General Knowledge', question:'Which is the largest planet in our solar system?', options:['Saturn','Earth','Jupiter','Neptune'], correct:2 },
    { category:'General Knowledge', question:'Who is widely known as the "father of computers"?', options:['Alan Turing','Charles Babbage','Tim Berners-Lee','Bill Gates'], correct:1 },
    { category:'General Knowledge', question:'What is the chemical symbol for water?', options:['HO2','H2O','OH2','H2O2'], correct:1 }
  ];

  const total = questions.length;
  let current = 0;
  let answers = new Array(total).fill(null);

  const categoryEl = document.getElementById('qCategory');
  const counterEl = document.getElementById('qCounter');
  const percentEl = document.getElementById('qPercent');
  const progressFill = document.getElementById('progressFill');
  const questionText = document.getElementById('questionText');
  const optionsContainer = document.getElementById('optionsContainer');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const quizCardBody = document.getElementById('quizCardBody');
  const quizView = document.getElementById('quizView');
  const scoreView = document.getElementById('scoreView');

  function renderQuestion(){
    const q = questions[current];
    const colors = categoryColors[q.category] || { bg:'rgba(15,76,92,0.1)', text:'#0F4C5C' };
    categoryEl.textContent = q.category;
    categoryEl.style.background = colors.bg;
    categoryEl.style.color = colors.text;

    counterEl.textContent = `Question ${current + 1} of ${total}`;
    const pct = Math.round(((current + 1) / total) * 100);
    percentEl.textContent = `${pct}% complete`;
    progressFill.style.width = pct + '%';

    questionText.textContent = q.question;

    optionsContainer.innerHTML = '';
    q.options.forEach((opt, i) => {
      const label = document.createElement('label');
      label.className = 'option' + (answers[current] === i ? ' selected' : '');

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'option';
      input.checked = answers[current] === i;

      const bubble = document.createElement('span');
      bubble.className = 'bubble';
      bubble.textContent = String.fromCharCode(65 + i);

      const text = document.createElement('span');
      text.className = 'option-text';
      text.textContent = opt; // textContent (not innerHTML) so literal tags like "<a>" display as text

      label.appendChild(input);
      label.appendChild(bubble);
      label.appendChild(text);
      label.addEventListener('click', () => selectOption(i));
      optionsContainer.appendChild(label);
    });

    prevBtn.disabled = current === 0;
    nextBtn.textContent = current === total - 1 ? 'Submit Quiz' : 'Next';
    nextBtn.disabled = answers[current] === null;

    quizCardBody.classList.remove('fade-in');
    void quizCardBody.offsetWidth;
    quizCardBody.classList.add('fade-in');
  }

  function selectOption(i){
    answers[current] = i;
    [...optionsContainer.children].forEach((el, idx) => {
      const isSelected = idx === i;
      el.classList.toggle('selected', isSelected);
      el.querySelector('input').checked = isSelected;
    });
    nextBtn.disabled = false;
  }

  prevBtn.addEventListener('click', () => {
    if (current > 0){ current--; renderQuestion(); }
  });

  nextBtn.addEventListener('click', () => {
    if (current === total - 1){ submitQuiz(); return; }
    current++;
    renderQuestion();
  });

  function submitQuiz(){
    let correctCount = 0;
    const catStats = {};
    questions.forEach((q, i) => {
      if (!catStats[q.category]) catStats[q.category] = { correct:0, total:0 };
      catStats[q.category].total++;
      if (answers[i] === q.correct){ correctCount++; catStats[q.category].correct++; }
    });

    const incorrectCount = total - correctCount;
    const pct = Math.round((correctCount / total) * 100);

    document.getElementById('statTotal').textContent = `${correctCount}/${total}`;
    document.getElementById('statCorrect').textContent = correctCount;
    document.getElementById('statIncorrect').textContent = incorrectCount;
    document.getElementById('ringPercent').textContent = pct + '%';

    const circumference = 2 * Math.PI * 84;
    const ring = document.getElementById('ringProgress');
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = circumference;
    let ringColor = pct >= 70 ? '#5E9276' : pct >= 40 ? '#C98A1B' : '#E2754A';
    ring.setAttribute('stroke', ringColor);
    setTimeout(() => {
      ring.style.transition = 'stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)';
      ring.style.strokeDashoffset = circumference - (circumference * pct / 100);
    }, 80);

    const catBreakdown = document.getElementById('catBreakdown');
    catBreakdown.innerHTML = '';
    Object.keys(catStats).forEach(cat => {
      const s = catStats[cat];
      const w = Math.round((s.correct / s.total) * 100);
      const row = document.createElement('div');
      row.className = 'cat-row';
      row.innerHTML = `
        <span class="name">${cat}</span>
        <span class="bar"><i style="width:${w}%"></i></span>
        <span class="frac">${s.correct}/${s.total}</span>
      `;
      catBreakdown.appendChild(row);
    });

    buildReview();
    quizView.style.display = 'none';
    scoreView.classList.add('active');
    document.getElementById('quizCard').scrollIntoView({ behavior:'smooth', block:'center' });
  }

  function escapeHtml(str){
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function buildReview(){
    const reviewList = document.getElementById('reviewList');
    reviewList.innerHTML = '';
    questions.forEach((q, i) => {
      const userAnswerIdx = answers[i];
      const isRight = userAnswerIdx === q.correct;
      const item = document.createElement('div');
      item.className = 'review-item ' + (isRight ? 'right' : 'wrong');
      const userAnsText = userAnswerIdx === null ? 'No answer' : escapeHtml(q.options[userAnswerIdx]);
      item.innerHTML = `
        <div class="ri-q">
          <span class="ri-icon">${isRight
            ? '<svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
            : '<svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'}</span>
          <span>${i + 1}. ${escapeHtml(q.question)}</span>
        </div>
        <div class="ri-ans">Your answer: <b>${userAnsText}</b>${isRight ? '' : `<br>Correct answer: <span class="ri-correct">${escapeHtml(q.options[q.correct])}</span>`}</div>
      `;
      reviewList.appendChild(item);
    });
  }

  document.getElementById('reviewBtn').addEventListener('click', (e) => {
    const list = document.getElementById('reviewList');
    list.classList.toggle('open');
    e.target.textContent = list.classList.contains('open') ? 'Hide Answers' : 'Review Answers';
  });

  document.getElementById('retakeBtn').addEventListener('click', () => {
    current = 0;
    answers = new Array(total).fill(null);
    scoreView.classList.remove('active');
    document.getElementById('reviewList').classList.remove('open');
    document.getElementById('reviewBtn').textContent = 'Review Answers';
    quizView.style.display = 'block';
    renderQuestion();
    document.getElementById('quizCard').scrollIntoView({ behavior:'smooth', block:'center' });
  });

  document.getElementById('startQuizBtn').addEventListener('click', () => {
    document.getElementById('quizCard').scrollIntoView({ behavior:'smooth', block:'center' });
  });

  renderQuestion();
