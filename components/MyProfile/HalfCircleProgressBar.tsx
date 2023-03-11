/**
 * Sample for semi circular progress bar
 */
import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  ProgressBarComponent,
  ProgressBarAnnotationsDirective,
  ProgressBarAnnotationDirective,
  Inject,
  ProgressAnnotation,
  ProgressTheme,
  ILoadedEventArgs,
} from "@syncfusion/ej2-react-progressbar";
import { Browser, EmitType } from "@syncfusion/ej2-base";
// import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }
     #control-container {
         padding: 0px !important;
     }
     .annotaion-pro {
             font-family: Roboto-Regular;
             font-size: 20px;
             color: #1B1C1A;
             letter-spacing: 0.01px;
         }
         .progress-bar-parent {
             margin-top: 8%;
             text-align: center;
         }
         .progress-text {
             display: inline-flex;
             margin: auto;
         }
         .progress-text-align {
             font-family: Roboto-Regular;
             font-size: 12px;
             color: #3D3E3C;
             letter-spacing: 0;
             margin: auto;
         }
 
         #control-container {
             padding: 0px !important;
         }
 
         .progress-container-align {
             text-align: center;
         }
 
         .reload-btn {
             text-align: center;
         }
 
         #reLoad {
             border-radius: 4px;
             text-transform: capitalize;
             margin-top: 3%;
         }
 
     `;

function HalfCircleProgressBar() {
  let annotationColors: string[] = [
    "#e91e63",
    "#0078D6",
    "#317ab9",
    "#007bff",
    "#4F46E5",
    "#FFD939",
    "#9A9A9A",
    "#22D3EE",
    "#0D6EFD",
  ];
  let content4: string =
    '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6;fill:#0078D6"><span>25%</span></div>';
  let thickness: number = 10;
  let inverseSemiProgress: ProgressBarComponent;
  let verticalProgress: ProgressBarComponent;
  let semiProgress: ProgressBarComponent;
  let verticalOppose: ProgressBarComponent;

  function onclick(): void {
    inverseSemiProgress.refresh();
    verticalProgress.refresh();
    verticalOppose.refresh();
    semiProgress.refresh();
  }

  function annotationElementContent(color: string, controlID: string): string {
    return (
      '<div id="point1" style="font-size:24px;font-weight:bold;color: ' +
      color +
      ' "><span>' +
      (100 % +"</span></div>")
    );
  }

  let progressLoad: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
    let selectedTheme: string = location.hash.split("/")[1];
    selectedTheme = selectedTheme ? selectedTheme : "Material";
    args.progressBar.theme = (
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
    )
      .replace(/-dark/i, "Dark")
      .replace(/contrast/i, "Contrast") as ProgressTheme;
    switch (selectedTheme) {
      case "material":
        args.progressBar.annotations[0].content = annotationElementContent(
          annotationColors[0],
          args.progressBar.element.id
        );
        break;
      case "fabric":
        args.progressBar.annotations[0].content = annotationElementContent(
          annotationColors[1],
          args.progressBar.element.id
        );
        break;
      case "bootstrap":
        args.progressBar.annotations[0].content = annotationElementContent(
          annotationColors[2],
          args.progressBar.element.id
        );
        break;
      case "bootstrap4":
        args.progressBar.annotations[0].content = annotationElementContent(
          annotationColors[3],
          args.progressBar.element.id
        );
        break;
      case "bootstrap-dark":
      case "fabric-dark":
      case "material-dark":
        args.progressBar.annotations[0].content = annotationElementContent(
          annotationColors[6],
          args.progressBar.element.id
        );
        break;
      case "bootstrap5":
      case "bootstrap5-dark":
      case "fluent":
      case "fluent-dark":
        args.progressBar.annotations[0].content = annotationElementContent(
          annotationColors[8],
          args.progressBar.element.id
        );
        break;
      case "tailwind-dark":
        args.progressBar.annotations[0].content = annotationElementContent(
          annotationColors[7],
          args.progressBar.element.id
        );
        break;
      default:
        args.progressBar.annotations[0].content = annotationElementContent(
          annotationColors[4],
          args.progressBar.element.id
        );
        break;
    }
  };

  return (
    <div className="control-pane">
      <style>{SAMPLE_CSS}</style>
      <div className="control-section progress-bar-parent">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-3 progress-container">
            <div className="progress-container-align">
              <ProgressBarComponent
                id="semi-container"
                type="Circular"
                startAngle={270}
                endAngle={90}
                width="160px"
                height="160px"
                minimum={0}
                maximum={100}
                value={25}
                cornerRadius="Round"
                trackThickness={thickness}
                progressThickness={thickness}
                animation={{
                  enable: true,
                  duration: 2000,
                  delay: 0,
                }}
              >
                <Inject services={[ProgressAnnotation]} />
                <ProgressBarAnnotationsDirective>
                  <ProgressBarAnnotationDirective
                    content={content4}
                  ></ProgressBarAnnotationDirective>
                </ProgressBarAnnotationsDirective>
              </ProgressBarComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HalfCircleProgressBar;
