import assets from '@onetype/framework/assets';

assets.Fn('import', ['framework'], 100);
assets.Fn('import', ['commands'], 200);
assets.Fn('import', ['database'], 300);
assets.Fn('import', ['elements'], 400);
assets.Fn('import', ['pages'], 410);
assets.Fn('import', ['directives'], 420);
assets.Fn('import', ['float'], 430);
assets.Fn('import', ['platform'], 500);

assets.expose.commands();
