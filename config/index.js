var dev = require('./development'),
	prod = require('./production');

/*
 * Recursively merge properties of two objects 
 */
var MergeRecursive = function(obj1, obj2) {
	for (var p in obj2) {
		try {
			// Property in destination object set; update its value.
			if (obj2[p].constructor == Object) {
				obj1[p] = MergeRecursive(obj1[p], obj2[p]);

			} else {
				obj1[p] = obj2[p];

			}

		} catch (e) {
			// Property in destination object not set; create it and set its value.
			obj1[p] = obj2[p];

		}
	}

	return obj1;
}

/* Returns environment configuration */
var ret = dev;

if (process.env.NODE_ENV === 'production') {
	ret = MergeRecursive(ret, prod);
}

module.exports = ret;