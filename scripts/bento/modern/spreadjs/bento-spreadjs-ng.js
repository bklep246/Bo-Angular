/**
 * Bento Themer Service for SpreadJS
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>, Dave Collier <dave.collier@thomsonreuters.com>
 * @date 18/09/2014
 *
 * Changelog:
 *
 * 18/09/2014:
 * - Initial build based on the Dave's jQuery demo
 *
 */

(function(angular){

  'use strict';

  angular.module('bento.spreadjs',[])
    .factory('$bentoSpreadJS',[
      function(){
        // Built-in user colors
        var bentoColors = new $.wijmo.wijspread.ThemeColor(
          "xxxxxxx",      // "The owner that contains the named variable" - **Not sure what this means**
          "#606060",      // `Text 1`
          "#A00000",      // `Text 2`
          "#E9E9E9",      // `Background 1`
          "#CCCCCC",      // `Background 2`
          "#555555",      // `Accent 1`
          "#FF8000",      // `Accent 2`
          "#DC0A0A",      // `Accent 3`
          "#6E3AB7",      // `Accent 4`
          "#0099C4",      // `Accent 5`
          "#77A22D",      // `Accent 6`
          "#444444",      // Link
          "#8c8c8c"       // Followed link
        );

        var bentoTheme = new $.wijmo.wijspread.SpreadTheme(
          "bentoTheme",   // `currentTheme`
          bentoColors,    // `ThemeColor`
          'Arial',        // `Headings` font
          '12px Arial'    // `Body` font
        );

        // Row + Column header grid lines
        var customStyle = new $.wijmo.wijspread.Style();
        customStyle.borderRight  =
        customStyle.borderBottom = new $.wijmo.wijspread.LineBorder("#CCCCCC", $.wijmo.wijspread.LineStyle.thin);

        /**
         * Apply Bento Theme to the spread and all of its sheets
         * @param spread - spreadsheet jQeury object
         * @param min - (optional) starting index of the sheet that needs to be styled
         * @param max - (optional) the cap of index where the sheets that need to be styled
         */
        var applyBentoTheme = function(spread, min, max){

          var start = min || 0;
          var end = max || spread.getSheetCount();

          // Make sure that we are using our custom theme
          spread.useWijmoTheme = true;

          for (var i = start; i < end; i++) {
            var sheet = spread.getSheet(i);
            // sets grid lines
            sheet.setGridlineOptions({color: "#CCCCCC"});
            // applies styling
            sheet.setDefaultStyle(customStyle, $.wijmo.wijspread.SheetArea.colHeader);
            sheet.setDefaultStyle(customStyle, $.wijmo.wijspread.SheetArea.rowHeader);
            sheet.setDefaultStyle(customStyle, $.wijmo.wijspread.SheetArea.corner); // not obeyed
            sheet.currentTheme(bentoTheme);
          }

          spread.repaint(); // this only needs to be called once
        };

        return {
          applyBentoTheme: applyBentoTheme
        };
      }
    ]);

})(window.angular);
