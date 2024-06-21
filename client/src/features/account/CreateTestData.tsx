import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { createProject } from "../projects/projectSlice";
import { createBug } from "../bugs/bugSlice";
import moment from "moment";

function CreateTestData() {
  const dispatch = useAppDispatch();

  const { projects } = useAppSelector((state) => state.projects);

  const createTestProjects = async () => {
    // Projects
    await dispatch(
      createProject({
        name: "First Project",
        description: "You're either first or you're last",
      }),
    );
    await dispatch(
      createProject({
        name: "Second Project",
        description: "Everyday is a second chance",
      }),
    );
    await dispatch(
      createProject({
        name: "Third Project",
        description: "Third time is the charm",
      }),
    );
  };

  const createTestBugs = async () => {
    if (
      projects &&
      projects[0] !== undefined &&
      projects[1] !== undefined &&
      projects[2] !== undefined
    ) {
      // Bugs
      await dispatch(
        createBug({
          project_id: projects[0].project_id,
          name: "Bug 1",
          description: "One is the loneliest number",
          priority_id: 1,
          status_id: 4,
          due_date: moment().subtract(50, "d").format("YYYY-MM-DD"),
          complete_date: moment().subtract(45, "d").format("YYYY-MM-DD"),
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[0].project_id,
          name: "Bug 2",
          description: "Two can be as bad as one",
          priority_id: 2,
          status_id: 4,
          due_date: moment().subtract(46, "d").format("YYYY-MM-DD"),
          complete_date: moment().subtract(45, "d").format("YYYY-MM-DD"),
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[1].project_id,
          name: "Bug 3",
          description: "It's the loneliest number since the number one",
          priority_id: 3,
          status_id: 4,
          due_date: moment().subtract(42, "d").format("YYYY-MM-DD"),
          complete_date: moment().subtract(39, "d").format("YYYY-MM-DD"),
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[0].project_id,
          name: "Bug 4",
          description: "Rhymes with door",
          priority_id: 2,
          status_id: 2,
          due_date: moment().subtract(37, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[2].project_id,
          name: "Bug 5",
          description: "Rhymes with guy... sort of",
          priority_id: 2,
          status_id: 4,
          due_date: moment().subtract(36, "d").format("YYYY-MM-DD"),
          complete_date: moment().subtract(32, "d").format("YYYY-MM-DD"),
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[1].project_id,
          name: "Bug 6",
          description: "Rhymes with ship... sort of",
          priority_id: 1,
          status_id: 4,
          due_date: moment().subtract(36, "d").format("YYYY-MM-DD"),
          complete_date: moment().subtract(32, "d").format("YYYY-MM-DD"),
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[2].project_id,
          name: "Bug 7",
          description: "Rhymes with heaven",
          priority_id: 1,
          status_id: 1,
          due_date: moment().subtract(33, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[0].project_id,
          name: "Bug 8",
          description: "Rhymes with weight",
          priority_id: 2,
          status_id: 4,
          due_date: moment().subtract(30, "d").format("YYYY-MM-DD"),
          complete_date: moment().subtract(29, "d").format("YYYY-MM-DD"),
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[1].project_id,
          name: "Bug 9",
          description: "Rhymes with fine",
          priority_id: 3,
          status_id: 3,
          due_date: moment().subtract(28, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[0].project_id,
          name: "Bug 10",
          description: "Rhymes with Ben",
          priority_id: 3,
          status_id: 4,
          due_date: moment().subtract(26, "d").format("YYYY-MM-DD"),
          complete_date: moment().subtract(24, "d").format("YYYY-MM-DD"),
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[0].project_id,
          name: "Bug 11",
          description: "Rhymes with heaven... just like 7",
          priority_id: 1,
          status_id: 4,
          due_date: moment().subtract(24, "d").format("YYYY-MM-DD"),
          complete_date: moment().subtract(22, "d").format("YYYY-MM-DD"),
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[1].project_id,
          name: "Bug 12",
          description: "Rhymes with swell",
          priority_id: 2,
          status_id: 2,
          due_date: moment().subtract(23, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[2].project_id,
          name: "Bug 13",
          description: "An unlucky number",
          priority_id: 2,
          status_id: 3,
          due_date: moment().subtract(21, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[2].project_id,
          name: "Bug 14",
          description: "Load up on guns",
          priority_id: 1,
          status_id: 4,
          due_date: moment().subtract(19, "d").format("YYYY-MM-DD"),
          complete_date: moment().subtract(15, "d").format("YYYY-MM-DD"),
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[0].project_id,
          name: "Bug 15",
          description: "Bring your friends",
          priority_id: 1,
          status_id: 4,
          due_date: moment().subtract(18, "d").format("YYYY-MM-DD"),
          complete_date: moment().subtract(15, "d").format("YYYY-MM-DD"),
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[0].project_id,
          name: "Bug 16",
          description: "It's fun to lose and to pretend",
          priority_id: 2,
          status_id: 4,
          due_date: moment().subtract(17, "d").format("YYYY-MM-DD"),
          complete_date: moment().subtract(15, "d").format("YYYY-MM-DD"),
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[2].project_id,
          name: "Bug 17",
          description: "Conversion, software version 7.0",
          priority_id: 3,
          status_id: 3,
          due_date: moment().subtract(16, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[0].project_id,
          name: "Bug 18",
          description: "Looking at life through the eyes of a tire hub",
          priority_id: 1,
          status_id: 1,
          due_date: moment().subtract(15, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[1].project_id,
          name: "Bug 19",
          description: "Eating seeds as a pastime activity",
          priority_id: 2,
          status_id: 1,
          due_date: moment().subtract(15, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[1].project_id,
          name: "Bug 20",
          description: "Rhymes with funny",
          priority_id: 3,
          status_id: 4,
          due_date: moment().subtract(14, "d").format("YYYY-MM-DD"),
          complete_date: moment().subtract(12, "d").format("YYYY-MM-DD"),
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[0].project_id,
          name: "Bug 21",
          description: "Rhymes with sun",
          priority_id: 2,
          status_id: 4,
          due_date: moment().subtract(11, "d").format("YYYY-MM-DD"),
          complete_date: moment().subtract(10, "d").format("YYYY-MM-DD"),
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[1].project_id,
          name: "Bug 22",
          description: "Rhymes with food",
          priority_id: 2,
          status_id: 2,
          due_date: moment().subtract(10, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[0].project_id,
          name: "Bug 23",
          description: "Rhymes with free",
          priority_id: 1,
          status_id: 4,
          due_date: moment().subtract(9, "d").format("YYYY-MM-DD"),
          complete_date: moment().subtract(7, "d").format("YYYY-MM-DD"),
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[1].project_id,
          name: "Bug 24",
          description: "Rhymes with floor",
          priority_id: 1,
          status_id: 1,
          due_date: moment().subtract(5, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[1].project_id,
          name: "Bug 25",
          description: "Rhymes with mind... sort of",
          priority_id: 2,
          status_id: 3,
          due_date: moment().subtract(4, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[2].project_id,
          name: "Bug 26",
          description: "Rhymes with trick... sort of",
          priority_id: 3,
          status_id: 4,
          due_date: moment().subtract(3, "d").format("YYYY-MM-DD"),
          complete_date: moment().subtract(3, "d").format("YYYY-MM-DD"),
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[2].project_id,
          name: "Bug 27",
          description: "Rhymes with Kevin",
          priority_id: 2,
          status_id: 3,
          due_date: moment().subtract(2, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[1].project_id,
          name: "Bug 28",
          description: "Rhymes with date",
          priority_id: 3,
          status_id: 2,
          due_date: moment().subtract(1, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[0].project_id,
          name: "Bug 29",
          description: "Rhymes with time",
          priority_id: 2,
          status_id: 1,
          due_date: moment().subtract(1, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[0].project_id,
          name: "Bug 30",
          description: "Rhymes with sturdy",
          priority_id: 1,
          status_id: 1,
          due_date: moment().subtract(0, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[1].project_id,
          name: "Bug 31",
          description: "Oh, give me the beat boys...",
          priority_id: 2,
          status_id: 1,
          due_date: moment().add(1, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[1].project_id,
          name: "Bug 32",
          description: "...and free my soul",
          priority_id: 2,
          status_id: 1,
          due_date: moment().add(2, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[0].project_id,
          name: "Bug 33",
          description: "I wanna get lost in your rock and roll...",
          priority_id: 3,
          status_id: 3,
          due_date: moment().add(2, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[2].project_id,
          name: "Bug 34",
          description: "...and drift away",
          priority_id: 1,
          status_id: 1,
          due_date: moment().add(3, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[2].project_id,
          name: "Bug 35",
          description: "I've done this too many times",
          priority_id: 3,
          status_id: 1,
          due_date: moment().add(5, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[1].project_id,
          name: "Bug 36",
          description: "It's not fun anymore",
          priority_id: 1,
          status_id: 2,
          due_date: moment().add(6, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[0].project_id,
          name: "Bug 37",
          description: "Must resist the urge to write random text",
          priority_id: 2,
          status_id: 3,
          due_date: moment().add(11, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[0].project_id,
          name: "Bug 38",
          description: "Back to writing song lyrics",
          priority_id: 3,
          status_id: 1,
          due_date: moment().add(14, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[2].project_id,
          name: "Bug 39",
          description: "So close, no matter how far...",
          priority_id: 2,
          status_id: 1,
          due_date: moment().add(21, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[2].project_id,
          name: "Bug 40",
          description: "Couldn't be much more from the heart...",
          priority_id: 1,
          status_id: 1,
          due_date: moment().add(26, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[2].project_id,
          name: "Bug 41",
          description: "Forever trusting who we are...",
          priority_id: 2,
          status_id: 1,
          due_date: moment().add(28, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[0].project_id,
          name: "Bug 42",
          description: "And nothing else matters",
          priority_id: 1,
          status_id: 1,
          due_date: moment().add(32, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[1].project_id,
          name: "Bug 43",
          description: "So close, just a few more",
          priority_id: 3,
          status_id: 1,
          due_date: moment().add(35, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[1].project_id,
          name: "Bug 44",
          description: "I can't wait to be done",
          priority_id: 2,
          status_id: 1,
          due_date: moment().add(38, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
      await dispatch(
        createBug({
          project_id: projects[0].project_id,
          name: "Bug 45",
          description: "It is finished!",
          priority_id: 3,
          status_id: 1,
          due_date: moment().add(40, "d").format("YYYY-MM-DD"),
          complete_date: null,
        }),
      );
    }
  };

  return (
    <>
      <button onClick={() => createTestProjects()}>Create Test Projects</button>
      <button onClick={() => createTestBugs()}>Create Test Bugs</button>
    </>
  );
}

export default CreateTestData;
