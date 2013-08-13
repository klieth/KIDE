
var Widget = (function() {
	var create = function(widget) {
		var opts = widget || widget.cls || widget.opts;
		if (!opts) {
			console.log("Error during widget creation");
			console.log(widget);
		}
		var w = new widget.cls();
		w.init();
		w.postLayout();
		return w;
	}
	return {};
})();
