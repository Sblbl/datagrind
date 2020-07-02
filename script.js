let tl = gsap.timeline({repeat: 0, repeatDelay: 0, paused: true}).timeScale(2);
let current_label = 'step-start' 

function get_lines(string) {
	let lines = []
	let re = /.\n/
	return string.split	(re)
}


//DOCUMENT-READY FUNCTIONS
jQuery(document).ready(function($){

	/*------PREPARATION------*/

	// PSEUDOCODE

	$('#pseudocode-container div').addClass('pseudo-line')
	$('.pseudo-line').each(function(i){
		$(this).attr('id', `pseudo-line-${i}`)
		t = $(this).text()
		$(this).empty()
		$(this).append(`<div class="pseudo-text" id="pseudo-text-${i}">${t}</div>`)
		let $_div = $(`<div class="pseudo-gutter" id="pseudo-gutter-${i}"></div>`).text(i)
		$(this).prepend($_div)
	})
 
	// CODE 
	let ce = $('#code-container')[0]
	let text = ce.textContent || ce.innerText;
	let code_editor = CodeMirror(function(node){ce.parentNode.replaceChild(node, ce);}, {
		value: text,
		mode:  'python',
		gutter : true,
		lineNumbers: true,
		firstLineNumber: 0,
		lineWrapping: true,
		theme : 'theme', 
		readOnly : true,
		fixedGutter : true,
		indentWithTabs : true,
		styleActiveLine: true,
    	styleActiveSelected: true,
	});

	let step_code_lines = {
		'step-0' : [],
		'step-1' : Array.from(Array(34-27), (e,i) => i+27),
		'step-2' : Array.from(Array(10-2), (e,i) => i+2),
		'step-3' : Array.from(Array(21-10), (e,i) => i+10),
		'step-4' : Array.from(Array(27-21), (e,i) => i+21),
		'step-5' : [],
		'step-6' : [],
	}

	console.log(code_editor.getCursor())

	$('.cm-s-theme .CodeMirror-activeline-background').removeClass('CodeMirror-activeline-background')
	$('.cm-s-theme .CodeMirror-activeline-gutter').removeClass('CodeMirror-activeline-gutter')

	function highlight_code (step) {
		console.log('high',step)
		if (step.length == 0) return;
		lines = step_code_lines['step-' + step]
		if (lines.length == 0) {
			code_editor.setCursor({'line' : 0, 'ch' : 0, 'sticky'  : null})
			return;
		}
		code_editor.setSelection({'line' : lines[0], 'ch' : 0}, {'line' : lines[lines.length-1]}, {'scroll' : false});
	}

	// DESCRIPTION

	$('#description-container div').addClass('descr-line')
	//$('#description-container :first-child').addClass('current')
	$('.descr-line').each(function(i){
		$(this).attr('id', `descr-line-${i}`)
		$(this).prepend(i+'.</br>')

	})

	// ILLUSTRATION 

	$('path').attr({'stroke-linecap' : 'round', 'stroke' : '6px'})


	/*------EVENTS------*/
	const max_steps  = 6

	function update_step(step) {
		console.log('step',step)
		tl.pause()
		$('.current').removeClass('current')

		if(step.length == 0) return;

		$(`div[step='${step}']`).addClass('current')
		console.log(step,$(`div[step='${step}']`))

		$("#description-container").scrollTop($("#description-container").scrollTop()+$('.descr-line.current').position().top)
		highlight_code (step) 


		current_label = 'step-' + step

		step = parseInt(step)

		if ( step < max_steps) {
			//tl.play('step-' + step)
			tl.tweenFromTo('step-' + step, 'step-' + (step+1))
		}  else {
			//tl.play('step-' + step)
			tl.tweenFromTo('step-' + step, total_duration)
		}

		//tl.pause()
		
	}

	// PSEUDOCODE

	$('.pseudo-line').on('click', function (e) {
		step = $(this).attr('step')
		update_step(step)
		
	})

	/*$('.pseudo-gutter').on('click', function (e) {
		step = $('.pseudo-line.current').attr('step')
		update_step(step) 
	})*/

	// CODE

	code_editor.on('cursorActivity', function() {
		let line = code_editor.getCursor().line;
		let step = ''
		for (let [key, value] of Object.entries(step_code_lines)) {
			if (value.includes(line)) {
				step = key
				//console.log(step)
				break;
			}
		}

		s = step.replace('step-', '')
		update_step(s)
		//highlight_code(s)
	});

	// DESCRIPTION
	$('.descr-line').on('click', function (e) {
		console.log(this);
		step = $(this).attr('step').replace('step-', '')
		update_step(step) 
	})

	// ILLUSTRATION
	// start
	let $_svg = $('svg'), 
	$_computer = $('#computer'), 
	$_computer_top = $('#computer_top')
	// s_0
	let $_flying_sheep = $('#flying_sheep'), 
	$_baloon_rounded = $('#baloon_rounded'), 
	$_classifier_sheep = $('#classifier_sheep') 
	// s_1
	let $_balance = $('#balance'), 
	$_balancer = $('#balancer'), 
	$_ruler = $('#ruler'), 
	$_table = $('#table'), 
	$_learner_sheep = $('#learner_sheep'), 
	$_table_1 = $('#table').clone(), 
	$_learner_donkey = $('#learner_donkey'), 
	$_table_2 = $('#table').clone(),
	$_learner_cow = $('#learner_cow'), 
	$_computer_l_arm = $('#computer_arm_l'),
	$_computer_r_arm = $('#computer_arm_r')
	// s_2
	let $_baloon_thoughts = $('#baloon_thoughts'),
	$_axes = $('#xy_axes'),
	$_x_lab = $('#x_lab'),
	$_y_lab = $('#y_lab'),
	$_scatter_sheep = $('#scatter_sheep'),
	$_scatter_donkey = $('#scatter_donkey'),
	$_scatter_cow = $('#scatter_cow'),
	$_classifier_donkey = $('#classifier_donkey'),
	$_classifier_cow = $('#classifier_cow')
	// s_3 
	let $_scatter_distances = $('#scatter_distances')
	// s_4
	let $_classifier_dot_sheep = $('#classifier_dot_sheep'),
	//animals
	$_1_NN_sheep = $('#1_nn_sheep'),
	$_2_NN_sheep = $('#2_nn_sheep'),
	$_3_NN_sheep = $('#3_nn_sheep'),
	$_1_NN_donkey = $('#1_nn_donkey'),
	$_2_NN_donkey = $('#2_nn_donkey'),
	$_3_NN_donkey = $('#3_nn_donkey'),
	//lines
	$_1_NN_sheep_line = $('#sheep_1_nn'),
	$_2_NN_sheep_line = $('#sheep_2_nn'),
	$_3_NN_sheep_line = $('#sheep_3_nn'),
	$_1_NN_donkey_line = $('#donkey_1_nn'),
	$_2_NN_donkey_line = $('#donkey_2_nn'),
	$_3_NN_donkey_line = $('#donkey_3_nn')
	// s_5
	let $_sunglasses = $('#sunglasses'),
	$_glass = $('#glass'),
	$_newspaper = $('#newspaper'),
	$_flying_cow = $('#flying_cow'),
	$_flying_donkey = $('#flying_donkey')
	// s_6
	let $_too_many_nn_dot = $('#too_many_dot'),
	$_too_few_dot = $('#too_few_dot'),
	$_too_many_1_nn = $('#too_many_n1'),
	$_too_many_2_nn = $('#too_many_n2'),
	$_too_many_3_nn = $('#too_many_n3'),
	$_too_many_4_nn = $('#too_many_n4'),
	$_too_many_5_nn = $('#too_many_n5'),
	$_too_few_1_nn = $('#too_few_n1'),
	$_wrong = $('#wrong_x')


	function get_label_change() {
		actual_label = tl.currentLabel()
		console.log('actual_label: ' + actual_label)
		if (actual_label != current_label) {
			tl.pause()
		}
	}


	$('#table-container').append($_table_1)
	$('#table-container').append($_table_2)


	let duration = 2

	let time = 0, 
	total_duration = 0, 
	padding = 2


	// START
	tl
		.addLabel('step-start', time)
		.set($_svg.children(), {'visibility' : 'hidden'}, 'step-start')
		.set($('.secret'), {'visibility' : 'visible'}, 'step-start')
		.set($_computer, {'visibility' : 'visible'}, 'step-start')
		time += padding

		let step_start_duration = time + padding
		total_duration += step_start_duration
		
	// STEP-0
	tl
		.addLabel('step-0', total_duration)

	time = 0
	let y_stop = 550


	tl
		.set($_computer, {'visibility' : 'visible'}, 'step-0')
		.set($_flying_sheep, {'visibility' : 'visible', 'y' : -100}, 'step-0')
		.to($_computer_top, duration, {rotation: -5, transformOrigin: 'left 90%'}, 'step-0')
		.to($_flying_sheep, duration*3, {'y' :  y_stop, ease : Linear.easeNone}, 'step-0')
		.to($_computer_top, duration, {rotation:0, transformOrigin: 'left 90%'}, 'step-0+='+(time+=duration))
		.set($_baloon_rounded, {'visibility' : 'visible'}, 'step-0+=' + time)
		.set($_classifier_sheep, {'visibility' : 'visible'}, 'step-0+=' + time)
		.set($_baloon_rounded, {'visibility' : 'hidden'}, 'step-0+='+ (time+=(duration*3+duration)))
		.set($_classifier_sheep, {'visibility' : 'hidden'}, 'step-0+='+ time)

	let step_0_duration = time + padding
	total_duration += step_0_duration


	// STEP-1
	tl
		.addLabel('step-1', total_duration)
	
	time = 0;
	let alpha = 4
	let table_stop = 320

	tl

		.set($_balance, {'visibility' : 'visible'}, 'step-1+=' + (time+=0.5))
		.set($_axes, {'visibility' : 'visible'}, 'step-1+=' + (time+=0.5))
		.fromTo($_x_lab, .5,{'visibility' : 'visible', scale: 0}, {scale: 1}, 'step-1+=' + (time+=0.5))
		.fromTo($_y_lab, .5,{'visibility' : 'visible', scale: 0}, {scale: 1}, 'step-1+=' + (time+=0.5))
		
		
		
		// sheep
		.set($('.table'), {'visibility' : 'visible', 'y' : -150}, 'step-1')
		.fromTo($_baloon_thoughts, .5,{'visibility' : 'visible', scale: 0}, {scale: 1}, 'step-1')
		.to($_table, duration*2, {'y' : table_stop, ease : Linear.easeNone}, 'step-1+=' + (time+=0.2))

		.set($_learner_sheep, {'visibility' : 'visible'}, 'step-1+='+(time+=duration*2))
		.to($_computer_top, duration/4, {'y' : +2, ease : Linear.easeNone}, 'step-1+=' + time)
		.to($_computer_l_arm, duration/4, {rotation: +5, transformOrigin: 'right 0%'}, 'step-1+=' + time)
		.to($_computer_r_arm, duration/4, {rotation: -5, transformOrigin: 'left 0%'}, 'step-1+=' + time)
		.to($_learner_sheep, duration/6, {'y' : + alpha , ease : Linear.easeNone}, 'step-1+=' + time)
		.to($_balancer, duration/2, {'y' : + alpha , ease : Linear.easeNone}, 'step-1+=' + time)
		.to($_learner_sheep, duration/2, {'y' : - alpha , ease : Linear.easeNone}, 'step-1+='+(time+=duration/2))
		.to($_computer_top, duration/4, {'y' : -2, ease : Linear.easeNone}, 'step-1+=' + time)
		.to($_computer_l_arm, duration/4, {rotation: 0, transformOrigin: 'right 0%'}, 'step-1+=' + time)
		.to($_computer_r_arm, duration/4, {rotation: 0, transformOrigin: 'left 0%'}, 'step-1+=' + time)
		.to($_balancer, duration/2, {'y' : - alpha , ease : Linear.easeNone}, 'step-1+=' + time)
		.set($_ruler, {'visibility' : 'visible'}, 'step-1+='+(time+=duration/2))

		.to($('#computer_happy_face'), {'visibility' : 'hidden'}, 'step-1+=' + time)

		$_scatter_sheep.children().each((i, child) => {
		tl.set(child, {'visibility' : 'visible'}, 'step-1+=' + (time+=0.2))
		})

		
	tl
		.to($('#computer_happy_face'), {'visibility' : 'visible'}, 'step-1+=' + time)
		.set($_baloon_rounded, {'visibility' : 'visible'}, 'step-1+=' + time)
		.set($_classifier_sheep, {'visibility' : 'visible'}, 'step-1+=' + time)

		.set($_learner_sheep, {'visibility' : 'hidden'}, 'step-1+='+(time+=duration/2))
		.set($_ruler, {'visibility' : 'hidden'}, 'step-1+='+(time))
		.to($_baloon_rounded, {'visibility' : 'hidden'}, 'step-1+=' + (time+=duration))
		.to($_classifier_sheep, {'visibility' : 'hidden'}, 'step-1+=' + (time))

		//donkey
	alpha += 4
	tl
		.to($_table_1, duration*2, {'y' : table_stop, ease : Linear.easeNone}, 'step-1+=' + (time+=1))
		.set($_learner_donkey, {'visibility' : 'visible'}, 'step-1+='+(time+=duration*2))
		.to($_computer_top, duration/4, {'y' : +2, ease : Linear.easeNone}, 'step-1+=' + time)
		.to($_computer_l_arm, duration/4, {rotation: +5, transformOrigin: 'right 0%'}, 'step-1+=' + time)
		.to($_computer_r_arm, duration/4, {rotation: -5, transformOrigin: 'left 0%'}, 'step-1+=' + time)
		.to($_learner_donkey, duration/6, {'y' : + alpha , ease : Linear.easeNone}, 'step-1+=' + time)
		.to($_balancer, duration/2, {'y' : + alpha , ease : Linear.easeNone}, 'step-1+=' + time)
		.to($_learner_donkey, duration/2, {'y' : - alpha , ease : Linear.easeNone}, 'step-1+='+(time+=duration/2))
		.to($_computer_top, duration/4, {'y' : -2, ease : Linear.easeNone}, 'step-1+=' + time)
		.to($_computer_l_arm, duration/4, {rotation: 0, transformOrigin: 'right 0%'}, 'step-1+=' + time)
		.to($_computer_r_arm, duration/4, {rotation: 0, transformOrigin: 'left 0%'}, 'step-1+=' + time)
		.to($_balancer, duration/2, {'y' : - alpha , ease : Linear.easeNone}, 'step-1+=' + time)
		.set($_ruler, {'visibility' : 'visible'}, 'step-1+='+(time+=duration/2))
		.to($('#computer_happy_face'), {'visibility' : 'hidden'}, 'step-1+=' + time)

		$_scatter_donkey.children().each((i, child) => {
			tl.set(child, {'visibility' : 'visible'}, 'step-1+=' + (time+=0.2))
		})

	tl
		.to($('#computer_happy_face'), {'visibility' : 'visible'}, 'step-1+=' + time)
		.set($_baloon_rounded, {'visibility' : 'visible'}, 'step-1+=' + time)
		.set($_classifier_donkey, {'visibility' : 'visible'}, 'step-1+=' + time)

		.set($_ruler, {'visibility' : 'hidden'}, 'step-1+='+(time+=duration/2))
		.set($_learner_donkey, {'visibility' : 'hidden'}, 'step-1+='+(time))

		.to($_baloon_rounded, {'visibility' : 'hidden'}, 'step-1+=' + (time+=duration))
		.to($_classifier_donkey, {'visibility' : 'hidden'}, 'step-1+=' + (time))

	// cow
	alpha += 4
	tl
		.to($_table_2, duration*2, {'y' : table_stop, ease : Linear.easeNone}, 'step-1+=' + (time+=2))
		.set($_learner_cow, {'visibility' : 'visible'}, 'step-1+='+(time+=duration*2))
		.to($_computer_top, duration/4, {'y' : +2, ease : Linear.easeNone}, 'step-1+=' + time)
		.to($_computer_l_arm, duration/4, {rotation: +5, transformOrigin: 'right 0%'}, 'step-1+=' + time)
		.to($_computer_r_arm, duration/4, {rotation: -5, transformOrigin: 'left 0%'}, 'step-1+=' + time)
		.to($_learner_cow, duration/6, {'y' : + alpha , ease : Linear.easeNone}, 'step-1+=' + time)
		.to($_balancer, duration/2, {'y' : + alpha , ease : Linear.easeNone}, 'step-1+=' + time)
		.to($_learner_cow, duration/2, {'y' : - alpha , ease : Linear.easeNone}, 'step-1+='+(time+=duration/2))
		.to($_computer_top, duration/4, {'y' : -2, ease : Linear.easeNone}, 'step-1+=' + time)
		.to($_computer_l_arm, duration/4, {rotation: 0, transformOrigin: 'right 0%'}, 'step-1+=' + time)
		.to($_computer_r_arm, duration/4, {rotation: 0, transformOrigin: 'left 0%'}, 'step-1+=' + time)
		.to($_balancer, duration/2, {'y' : - alpha , ease : Linear.easeNone}, 'step-1+=' + time)
		.set($_ruler, {'visibility' : 'visible'}, 'step-1+='+(time+=duration/2))
		.to($('#computer_happy_face'), {'visibility' : 'hidden'}, 'step-1+=' + time)

		$_scatter_cow.children().each((i, child) => {
			tl.set(child, {'visibility' : 'visible'}, 'step-1+=' + (time+=0.2))
		})

	tl
		.to($('#computer_happy_face'), {'visibility' : 'visible'}, 'step-1+=' + time)
		.set($_baloon_rounded, {'visibility' : 'visible'}, 'step-1+=' + time)
		.set($_classifier_cow, {'visibility' : 'visible'}, 'step-1+=' + time)

		.set($_ruler, {'visibility' : 'hidden'}, 'step-1+='+(time+=duration/2))
		.to($_baloon_rounded, {'visibility' : 'hidden'}, 'step-1+=' + (time+=duration))
		.to($_classifier_cow, {'visibility' : 'hidden'}, 'step-1+=' + time)
		.set($_learner_cow, {'visibility' : 'hidden'}, 'step-1+='+time)

		.set($_balance, {'visibility' : 'hidden'}, 'step-1+=' + (time+=duration/4))
		.set($('.table'), {'visibility' : 'hidden'}, 'step-1+=' + time)

	let step_1_duration = time + padding
	total_duration += step_1_duration

	
	// STEP-2
	tl
		.addLabel('step-2', total_duration)
	
	time = 0

	tl
		.set($_flying_sheep, {'y' : -100, 'visibility' : 'visible'}, 'step-2+=' + (time +=0.5))
		.set($_balance, {'visibility' : 'visible'}, 'step-2+=' + time)
		.to($_computer_top, duration, {rotation: -5, transformOrigin: 'left 90%'}, 'step-2+=' + time)
		.to($_flying_sheep, duration*3, {'y' : 164, ease : Linear.easeNone}, 'step-2+=' + time)
		.to($_computer_top, duration*2, {rotation:0, transformOrigin: 'left 90%'}, 'step-2+='+(time+=duration*2))

		.to($_balancer, duration/2, {'y' : + alpha, ease : Linear.easeNone}, 'step-2+=' + (time+=duration))
		.to($_flying_sheep, duration/2, {'y' : 156, ease : Linear.easeNone}, 'step-2+='+(time+=duration/2))
		.to($_balancer, duration/2, {'y' : - alpha, ease : Linear.easeNone}, 'step-2+=' + time)

		.set($_ruler, {'visibility' : 'visible'}, 'step-2+='+(time+=duration/4))
		.set($_ruler, {'visibility' : 'hidden'}, 'step-2+='+(time+=duration/2))

		.fromTo($_classifier_dot_sheep, duration/4, {'visibility' : 'hidden', scale : 3}, {'visibility' : 'visible', scale : 1},'step-2+=' + (time))

		timing = duration/2

		$('#n_neighbours').children().each((i, child) => {
			tl.set(child, {'visibility' : 'visible'}, 'step-2+=' + (time+=timing))
		})

		tl.to($('#n_neighbours').children(), {'visibility' : 'hidden'}, 'step-2+=' + (time+=duration))


	let step_2_duration = time + padding
	total_duration += step_2_duration


	// STEP-3
	tl
		.addLabel('step-3', total_duration)
	
	alpha =4
	time = 0

	tl
	
		
		.to($('#computer_happy_face'), {'visibility' : 'hidden'}, 'step-3+=' +(time+=0.5))
		timing = duration/2
		$_scatter_distances.children().each((i, child) => {

			tl.set(child, {'visibility' : 'visible'}, 'step-3+=' + (time+=timing))
			tl.set(child, {'visibility' : 'hidden'}, 'step-3+=' + (time+=0.2))
			
			if (i%8 == 0) {
				tl.to($('#computer_thougthful_face'), {'visibility' : 'hidden'}, 'step-3+=' + time)
			}

			if (i%16 == 0) {
				tl.to($('#computer_thougthful_face'), {'visibility' : 'visible'}, 'step-3+=' + time)
			}
			timing = 0.1
		})

	tl.to($('#computer_thougthful_face'), {'visibility' : 'visible'}, 'step-3+=' + (time+=0.2))

	let step_3_duration = time + padding
	total_duration += step_3_duration

	// STEP-4

	tl
		.addLabel('step-4', total_duration)
	time = 0

	tl
		.set($_classifier_dot_sheep, {'scale' : 1}, 'step-4+=' + (time+=0.2))
		.to($_1_NN_sheep_line, duration/2, {'visibility' : 'visible'}, 'step-4+='+(time+=duration/2))
		.to($_1_NN_sheep, duration/2, {'visibility' : 'visible'}, 'step-4+='+(time+=duration/2))
		.to($('#computer_thougthful_face'), {'visibility' : 'hidden'}, 'step-3+=' + time)

		.to($_2_NN_sheep_line, duration/2, {'visibility' : 'visible'}, 'step-4+='+(time+=duration/2))
		.to($_2_NN_sheep, duration/2, {'visibility' : 'visible'}, 'step-4+='+(time+=duration/2))
		.to($('#computer_thougthful_face'), {'visibility' : 'visible'}, 'step-4+=' + time)

		.to($_3_NN_sheep_line, duration/2, {'visibility' : 'visible'}, 'step-4+='+(time+=duration/2))
		.to($_3_NN_sheep, duration/2, {'visibility' : 'visible'}, 'step-4+='+(time+=duration/2))
		.to($('#computer_thougthful_face'), {'visibility' : 'hidden'}, 'step-4+=' + time)

		.to($('#computer_happy_face'), {'visibility' : 'visible'}, 'step-4+=' + (time+=duration/2))
		
		.set($_baloon_rounded, {'visibility' : 'visible'}, 'step-4+='+time)
		.set($_classifier_sheep, {'visibility' : 'visible'}, 'step-4+='+time)
		.fromTo($_classifier_dot_sheep, duration/2, {scale : 3}, {'fill' : '#48cc7b', scale : 1},'step-4+=' + (time+=1))

		.set($_baloon_rounded, {'visibility' : 'hidden'}, 'step-4+=' + (time+=duration*2))
		.set($_classifier_sheep, {'visibility' : 'hidden'}, 'step-4+='+time)
		.to($_baloon_rounded, {'visibility' : 'hidden'}, 'step-4+='+time)
		.to($_classifier_sheep, {'visibility' : 'hidden'}, 'step-4+='+time)
		.to($_classifier_dot_sheep, {'visibility' : 'hidden'}, 'step-4+='+time)
		.to($_1_NN_sheep_line, {'visibility' : 'hidden'}, 'step-4+='+time)
		.to($_2_NN_sheep_line, {'visibility' : 'hidden'}, 'step-4+='+time)
		.to($_3_NN_sheep_line, {'visibility' : 'hidden'}, 'step-4+='+time)
		.to($_1_NN_sheep, {'visibility' : 'hidden'}, 'step-4+='+time)
		.to($_2_NN_sheep, {'visibility' : 'hidden'}, 'step-4+='+time)
		.to($_3_NN_sheep, {'visibility' : 'hidden'}, 'step-4+='+time)
		.to($_balance, {'visibility' : 'hidden'}, 'step-4+='+time)
		.to($_flying_sheep, {'visibility' : 'hidden'}, 'step-4+='+time)
		.to($('#scatter'), {'visibility' : 'hidden'}, 'step-4+='+time)
		.to($_baloon_thoughts, {'visibility' : 'hidden'}, 'step-4+='+time)

	let step_4_duration = time + duration/2 + padding
	total_duration += step_4_duration


	// STEP-5
	tl
		.addLabel('step-5', total_duration)
	time = 0

	tl

		.set($_sunglasses, {'visibility' : 'visible', 'y' : -150}, 'step-5')
		.set($_classifier_dot_sheep, {'scale' : 1}, 'step-5')
		.set($_glass, {'visibility' : 'visible', 'y' : -150}, 'step-5')
		.set($_newspaper, {'visibility' : 'visible', 'y' : -150}, 'step-5')
		
		.set($_flying_sheep, {'visibility' : 'visible', 'y' : -300}, 'step-5')
		.set($_flying_donkey, {'visibility' : 'visible', 'y' : -300}, 'step-5')
		.set($_flying_cow, {'visibility' : 'visible', 'y' : -300}, 'step-5')

		.to($_sunglasses, duration*2, {'y' : 340}, 'step-5')
		.to($_newspaper, duration*2, {'y' : 360}, 'step-5+=' + (time+=duration*2))
		.to($_computer_l_arm, duration/4, {rotation: -12, transformOrigin: 'right 0%'}, 'step-5+=' + (time+=duration+duration/2))
		.to($_computer_r_arm, duration/4, {rotation: +14, transformOrigin: 'left 0%'}, 'step-5+=' + time)
		.to($_glass, duration*2, {'y' : 270}, 'step-5+=' + (time+=duration))
	
	$_computer_top.append($_sunglasses)
	$_computer_top.append($_glass)
	$_computer_top.append($_newspaper)

	tl
		.to($_flying_cow, duration*3, {'y' :  y_stop, ease : Linear.easeNone}, 'step-5+=' + (time+=duration*2))
		
		.to($_computer_top, duration, {rotation: -5, transformOrigin: 'left 90%'}, 'step-5+=' + (time +=duration))
		.set($_baloon_rounded, {'visibility' : 'visible'}, 'step-5+=' + (time))
		.set($_classifier_cow, {'visibility' : 'visible'}, 'step-5+=' + time)
		.to($_computer_top, duration, {rotation: 0, transformOrigin: 'left 90%'}, 'step-5+=' + (time +=duration))

		
		.to($_baloon_rounded, {'visibility' : 'hidden'}, 'step-5+=' + (time+=duration))
		.to($_classifier_cow, {'visibility' : 'hidden'}, 'step-5+=' + time)

		.to($_flying_donkey, duration*3, {'y' :  y_stop, ease : Linear.easeNone}, 'step-5+=' + (time+=duration*2))

		.to($_computer_top, duration, {rotation: +5, transformOrigin: 'left 90%'}, 'step-5+=' + (time +=duration))
		.set($_baloon_rounded, {'visibility' : 'visible'}, 'step-5+=' + (time))
		.set($_classifier_donkey, {'visibility' : 'visible'}, 'step-5+=' + time)
		.to($_computer_top, duration, {rotation: 0, transformOrigin: 'left 90%'}, 'step-5+=' + (time +=duration))

		.to($_baloon_rounded, {'visibility' : 'hidden'}, 'step-5+=' + (time+=2))
		.to($_classifier_donkey, {'visibility' : 'hidden'}, 'step-5+=' + time)

	let step_5_duration = time + padding
	total_duration += step_5_duration

	// STEP-6

	tl
		.addLabel('step-6', total_duration)
	time = 0

	$_nn_example_background = $('#nn_example').children().not('.second_moment')

	tl
		.to($_svg, duration, {attr:{ viewBox: '0 0 440.4 309.9'},ease:Power2.easeInOut}, 'step-6')
		.set($_glass, {'visibility' : 'hidden'}, 'step-6')
		.set($_scatter_cow.children(), {'visibility' : 'hidden'}, 'step-6+=' + (time+=duration))
		.set($_scatter_sheep.children(), {'visibility' : 'hidden'}, 'step-6+=' + time)
		.set($_scatter_donkey.children(), {'visibility' : 'hidden'}, 'step-6+=' + time)
		
		
		.set($_nn_example_background, {'visibility' : 'visible'}, 'step-6+=' + time)
		.set($_too_many_nn_dot, {'visibility' : 'visible'}, 'step-6+=' + (time+=duration/2))
		.fromTo($_too_many_nn_dot, duration/2, {scale : 3}, {scale : 1},'step-6+=' + time)
		.to($_too_many_1_nn, duration/2, {'visibility' : 'visible'}, 'step-6+='+(time+=duration/2))
		.to($_too_many_2_nn, duration/2, {'visibility' : 'visible'}, 'step-6+='+(time+=duration/2))
		.to($_too_many_3_nn, duration/2, {'visibility' : 'visible'}, 'step-6+='+(time+=duration/2))
		.to($_too_many_4_nn, duration/2, {'visibility' : 'visible'}, 'step-6+='+(time+=duration/2))
		.to($_too_many_5_nn, duration/2, {'visibility' : 'visible'}, 'step-6+='+(time+=duration/2))
		.set($_too_many_nn_dot, {'fill' : '#ff8767'}, 'step-6+=' + (time+=duration/2))
		.set($_wrong, {'visibility' : 'visible'}, 'step-6+=' + (time+=duration/2))
		.set($_wrong, {'visibility' : 'hidden'}, 'step-6+=' + (time+=duration/2))

		.set($_too_few_dot, {'visibility' : 'visible'}, 'step-6+=' + (time+=duration/2))
		.fromTo($_too_few_dot, duration/2, {scale : 3}, {scale : 1},'step-6+=' + time)
		.to($_too_few_1_nn, duration/2, {'visibility' : 'visible'}, 'step-6+='+(time+=duration/2))
		.set($_too_few_dot, {'fill' : '#ff8767'}, 'step-6+=' + (time+=duration/2))
		.set($_wrong, {'visibility' : 'visible'}, 'step-6+=' + (time+=duration/2))
		.set($_wrong, {'visibility' : 'hidden'}, 'step-6+=' + (time+=duration/2))


		.set($_svg.children(), {'visibility' : 'hidden'}, 'step-6+=' + (time+=duration))
	let step_6_duration = time + padding
	total_duration += step_6_duration
	tl.to($_svg.children(), duration, {'visibility' : 'hidden'}, total_duration)


	tl.play().seek('step-start+=1').pause()

	
})

