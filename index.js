import * as logger	from 'js-logger';

import { loggerConstants }	from './logger-constants';

logger.useDefaults();
logger.setLevel( loggerConstants.DEBUG );

let sigils = {
	[ loggerConstants.DEBUG ]: "**",
	[ loggerConstants.INFO ]:	"->",
	[ loggerConstants.TIME ]:	"))",
	[ loggerConstants.WARN ]:	"=>",
	[ loggerConstants.ERROR ]:	"!!"
};

let defaultHandler = logger.createDefaultHandler( {

	// prefix each log message with a level indicator
	formatter: ( messages, context ) => {

		let sigil = sigils[ context.level.name ];

		let concatenableTypes = [
			'string',
			'boolean',
			'number'
		];

		if( concatenableTypes.includes( typeof messages[ 0 ] ) ) {
			messages[ 0 ] = `${ context.level.name} ${sigil} ${messages[ 0 ]}`;
		}
		else {
			messages.unshift( sigil );
		}
		
	}

} );

logger.setHandler(
	( messages, context ) => {
		defaultHandler( messages, context );
	}
);

export default logger;

export {
	loggerConstants
};
