import Link from "next/link";
import ArrowBackIcon from "@/_icons/arrow-back-icon";
import {ChangeEvent, Dispatch, MouseEventHandler, SetStateAction} from "react";
import InlineInput from "@/_components/inline-input";
import DeleteIcon from "@/_icons/delete-icon";
import FullScreenButton from "@/_components/full-screen-button";
import {FullScreenHandle} from "react-full-screen";
import FileInput from "@/_components/file-input";
import PdfIcon from "@/_icons/pdf-icon";
import InlineSelect from "@/_components/inline-select";
import {CM, IN} from "@/calibrate/page";
import InvertColorOffIcon from "@/_icons/invert-color-off-icon";
import InvertColorIcon from "@/_icons/invert-color-icon";
import FlipVerticalOffIcon from "@/_icons/flip-vertical-off-icon";
import FlipVerticalIcon from "@/_icons/flip-vertical-icon";
import FlipHorizontalOffIcon from "@/_icons/flip-horizontal-off-icon";
import FlipHorizontalIcon from "@/_icons/flip-horizontal-icon";
import Rotate90DegreesCWIcon from "@/_icons/rotate-90-degrees-cw-icon";
import {TransformSettings} from "@/_lib/transform-settings";
import ArrowForwardIcon from "@/_icons/arrow-forward-icon";

function visible(b: boolean): string {
  return b ? "visible" : "hidden";
}
export default function Header({
  isCalibrating,
  setIsCalibrating,
  height,
  width,
  handleHeightChange,
  handleWidthChange,
  handleResetCalibration,
  handleFileChange,
  fullScreenHandle,
  unitOfMeasure,
  setUnitOfMeasure,
  transformSettings,
  setTransformSettings,
  pageNumber,
  setPageNumber,
  pageCount,
}: {
  isCalibrating: boolean;
  setIsCalibrating: Dispatch<SetStateAction<boolean>>;
  height: string;
  width: string;
  handleHeightChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleWidthChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleResetCalibration: () => void;
  fullScreenHandle: FullScreenHandle;
  unitOfMeasure: string;
  setUnitOfMeasure: Dispatch<SetStateAction<string>>;
  transformSettings: TransformSettings;
  setTransformSettings: Dispatch<SetStateAction<TransformSettings>>;
  pageNumber: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
  pageCount: number;
}) {
  function changePage(offset: number) {
    setPageNumber((prevPageNumber: number) => prevPageNumber + offset);
  }

  function handlePreviousPage() {
    console.log(`previous page`);
    changePage(-1);
  }

  function handleNextPage() {
    console.log(`next page`);
    changePage(1);
  }

  return (<header className="bg-white absolute top-0 left-0 w-full z-30 border-b-2">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8" aria-label="Global">
        <div className="flex items-center">
          <Link
            className={`bg-white cursor-pointer from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full p-2.5`}
            href="/"
          >
            <ArrowBackIcon/>
          </Link>
          <h2 className="mr-2">{isCalibrating ? 'Calibrating' : 'Projecting'}</h2>
          <FullScreenButton
            className={`bg-white z-20 cursor-pointer from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full p-2.5`}
            handle={fullScreenHandle}
          />
        </div>
        <div className={`flex items-center ${visible(isCalibrating)}`}>
          <InlineInput
            className="mr-1"
            handleChange={handleHeightChange}
            id="height"
            inputTestId="height"
            label="H:"
            labelRight={unitOfMeasure === CM ? 'cm' : 'in'}
            name="height"
            value={height}
          />
          <InlineInput
            className="mr-1"
            handleChange={handleWidthChange}
            id="height"
            inputTestId="height"
            label="W:"
            labelRight={unitOfMeasure === CM ? 'cm' : 'in'}
            name="width"
            value={width}
          />
          <InlineSelect
            handleChange={(e) => setUnitOfMeasure(e.target.value)}
            id="unit_of_measure"
            inputTestId="unit_of_measure"
            name="unit_of_measure"
            value={unitOfMeasure}
            options={[{value: IN, label: 'in'}, {value: CM, label: 'cm'}]}
          />
          <button
            className={`bg-white cursor-pointer from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full p-2.5 ${visible(
              isCalibrating
            )}`}
            name={"Delete points"}
            onClick={handleResetCalibration}
          >
            <DeleteIcon/>
          </button>
        </div>
        <div className={`flex items-center ${visible(!isCalibrating)}`}>
          <button
            className={`bg-white cursor-pointer from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full p-2.5 mr-2`}
            name={"Invert colors"}
            onClick={() => setTransformSettings({ ...transformSettings, inverted: !transformSettings.inverted })}
          >
            {transformSettings.inverted ? <InvertColorOffIcon/> : <InvertColorIcon/>}
          </button>
          <button
            className={`bg-white cursor-pointer from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full p-2.5 mr-2`}
            name={"Flip vertically"}
            onClick={() => setTransformSettings({ ...transformSettings, scale: { x: transformSettings.scale.x * -1, y: transformSettings.scale.y } })}
          >
            {transformSettings.scale.x === -1 ? <FlipVerticalOffIcon /> : <FlipVerticalIcon />}
          </button>
          <button
            className={`bg-white cursor-pointer from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full p-2.5 mr-2`}
            name={"Flip horizontally"}
            onClick={() => setTransformSettings({ ...transformSettings, scale: { x: transformSettings.scale.x, y: transformSettings.scale.y * -1 } })}
          >
            {transformSettings.scale.y === -1 ? (
              <FlipHorizontalOffIcon />
            ) : (
              <FlipHorizontalIcon />
            )}
          </button>
          <button
            className={`bg-white cursor-pointer from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full p-2.5`}
            name={"Rotate 90 degrees clockwise"}
            onClick={() => setTransformSettings({ ...transformSettings, degrees: ((transformSettings.degrees + 90) % 360) })}
          >
            <Rotate90DegreesCWIcon />
          </button>
          <div className={`flex items-center ml-3 ${visible(pageCount > 1)}`}>
            <button
              disabled={pageNumber <= 1}
              onClick={handlePreviousPage}
              name="Previous Page"
            >
              <ArrowBackIcon />
            </button>
            {pageNumber}
            <button
              disabled={pageNumber >= pageCount}
              onClick={handleNextPage}
              name="Next Page"
            >
              <ArrowForwardIcon />
            </button>
          </div>
        </div>
        <div className="flex items-center">
          <label
            className={`${visible(
              !isCalibrating
            )} outline mr-2 outline-purple-700 flex items-center text-purple-800 focus:ring-2 focus:outline-none focus:ring-blue-300 hover:bg-purple-100 font-medium rounded-lg text-sm px-2 py-1.5 hover:bg-none text-center`}
          >
            <FileInput
              accept="application/pdf"
              className="hidden"
              handleChange={handleFileChange}
              id="pdfFile"
            ></FileInput>
            <span className="mr-2">
             <PdfIcon/>
          </span>
            Upload PDF
          </label>
          <button
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={() => setIsCalibrating(!isCalibrating)}
          >
            {isCalibrating ? "Project" : "Calibrate"}
          </button>
        </div>
      </nav>
    </header>
  );
}