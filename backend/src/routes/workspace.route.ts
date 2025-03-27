import { Router } from "express";
import {
  createWorkspaceController,
  getAllWorkspacesUserIsMemberController,
  getWorkspaceByIdController,
} from "../controllers/workspace.controller";

const workspaceRoutes = Router();
workspaceRoutes.post("/create/new", createWorkspaceController);
workspaceRoutes.get("/all", getAllWorkspacesUserIsMemberController);
workspaceRoutes.get("/members/:id", getWorkspaceByMembersController);
workspaceRoutes.get("/:id", getWorkspaceByIdController);
export default workspaceRoutes;
