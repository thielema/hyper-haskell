/* *************************************************************
    Worksheet file format

    Compatibility and conversion utilities.

    We try to be loosely compatible with the Jupyter notebook format,
      <https://nbformat.readthedocs.io/en/latest/>.
    Right now, this is very limited, and only applies to some naming
    conventions.

    Sorry, the specification of the file format
      has to be guess from the source code in `worksheet.js`
      for now.
************************************************************* */

exports.parse     = (data) => { return JSON.parse(data) }
exports.stringify = (json) => { return JSON.stringify(json,null,2) }

// Document with a single, empty cell
exports.single    = () => { return {
    version        : '0.2.1.0',
    cells          : [{
      'cell_type' : 'code',
      source      : '',
    }],
	extensions     : '',
    importModules  : '',
    loadFiles      : '',
    settings       : {
      packageTool : 'cabal',
      packagePath : '',
      searchPath  : '',
    },
  }
}

// Update the file format to a new version
exports.update    = (versionNew, input) => {
  // FIXME: Make sure that the JSON object is actually copied.
  let output     = input
  let versionOld = input.version

  // Remark: We use lexicographic ordering to test whether we should upgrade
  if (versionOld === '0.1.0.0' && versionNew >= '0.2.0.0') {
    output.cells   = input.cells.map( (source) => {
      return {
        'cell_type' : 'code',
        'source'    : source
      }
    })
	versionOld     = '0.2.0.0'
    output.version = versionOld
  }

  // We can perform several upgrades in sequence.

  return output
}
