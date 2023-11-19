<?php

if ((substr($_SERVER['REMOTE_ADDR'],0,11) === '69.164.163.') ||
		(substr(@$_SERVER['HTTP_X_FORWARDED_FOR'],0,11) === '69.164.163.')) {
	die('website disabled');
}

/********************************************************************
 * Header
 ********************************************************************/

function ThemeHeaderTemplate() {
	global $panels;
?>
<!DOCTYPE html>
<html><head>

	<meta charset="utf-8" />

	<title><?php if ($panels->pagetitle) echo htmlspecialchars($panels->pagetitle).' - '; ?>Pok&eacute;mon Showdown</title>

<?php if ($panels->pagedescription) { ?>
	<meta name="description" content="<?php echo htmlspecialchars($panels->pagedescription); ?>" />
<?php } ?>

	<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=IE8" />
	<link rel="stylesheet" href="//localhost/style/font-awesome.css?0.6459905245713282" />
	<link rel="stylesheet" href="//191.101.232.116/theme/panels.css?0.3491490436998683" />
	<link rel="stylesheet" href="//191.101.232.116/theme/main.css?0.8971973776655364" />
	<link rel="stylesheet" href="//localhost/style/battle.css?0.34367786869635575" />
	<link rel="stylesheet" href="//localhost/style/replay.css?0.27397918163996726" />
	<link rel="stylesheet" href="//localhost/style/utilichart.css?0.8704644213702533" />

	<!-- Workarounds for IE bugs to display trees correctly. -->
	<!--[if lte IE 6]><style> li.tree { height: 1px; } </style><![endif]-->
	<!--[if IE 7]><style> li.tree { zoom: 1; } </style><![endif]-->

	<script type="text/javascript">
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-26211653-1']);
		_gaq.push(['_setDomainName', 'pokemonshowdown.com']);
		_gaq.push(['_setAllowLinker', true]);
		_gaq.push(['_trackPageview']);

		(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
	</script>
</head><body>

	<div class="pfx-topbar">
		<div class="header">
			<ul class="nav">
				<li><a class="button nav-first<?php if ($panels->tab === 'home') echo ' cur'; ?>" href="//pokemonshowdown.com/"><img src="//191.101.232.116/images/pokemonshowdownbeta.png?0.8616494258767253" alt="Pok&eacute;mon Showdown! (beta)" /> Home</a></li>
				<li><a class="button<?php if ($panels->tab === 'pokedex') echo ' cur'; ?>" href="//dex.pokemonshowdown.com/">Pok&eacute;dex</a></li>
				<li><a class="button<?php if ($panels->tab === 'replay') echo ' cur'; ?>" href="/">Replays</a></li>
				<li><a class="button<?php if ($panels->tab === 'ladder') echo ' cur'; ?>" href="//pokemonshowdown.com/ladder/">Ladder</a></li>
				<li><a class="button nav-last" href="//pokemonshowdown.com/forums/">Forum</a></li>
			</ul>
			<ul class="nav nav-play">
				<li><a class="button greenbutton nav-first nav-last" href="http://play.pokemonshowdown.com/">Play</a></li>
			</ul>
			<div style="clear:both"></div>
		</div>
	</div>
<?php
}

/********************************************************************
 * Footer
 ********************************************************************/

function ThemeScriptsTemplate() {
?>
	<script src="//localhost/js/lib/jquery-1.11.0.min.js?0.11794091595707967"></script>
	<script src="//localhost/js/lib/lodash.core.js?0.7651219374875486"></script>
	<script src="//localhost/js/lib/backbone.js?0.4379645203889"></script>
	<script src="//dex.pokemonshowdown.com/js/panels.js?0.3914408497300246"></script>
<?php
}

function ThemeFooterTemplate() {
	global $panels;
?>
<?php $panels->scripts(); ?>

	<script src="//localhost/js/lib/jquery-cookie.js?0.33129099052974076"></script>
	<script src="//localhost/js/lib/html-sanitizer-minified.js?0.12983382575994096"></script>
	<script src="//localhost/js/battle-sound.js?0.03824478212098836"></script>
	<script src="//localhost/config/config.js?0.296759532325896"></script>
	<script src="//localhost/js/battledata.js?0.8880593336179774"></script>
	<script src="//localhost/data/pokedex-mini.js?0.6203997388900397"></script>
	<script src="//localhost/data/pokedex-mini-bw.js?0.2514397193940261"></script>
	<script src="//localhost/data/graphics.js?0.8828461452185736"></script>
	<script src="//localhost/data/pokedex.js?0.6761208843863431"></script>
	<script src="//localhost/data/items.js?0.28222751958720793"></script>
	<script src="//localhost/data/moves.js?0.9680473890763646"></script>
	<script src="//localhost/data/abilities.js?0.3805985297064778"></script>
	<script src="//localhost/data/teambuilder-tables.js?0.08439606574691427"></script>
	<script src="//localhost/js/battle-tooltips.js?0.8902925956609942"></script>
	<script src="//localhost/js/battle.js?0.07786618435010606"></script>
	<script src="/js/replay.js?51e024e3"></script>

</body></html>
<?php
}
