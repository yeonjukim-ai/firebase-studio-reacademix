"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { StudentAddDialog } from "./StudentAddDialog";

export function AddStudentButton() {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                학생 추가
            </Button>
            <StudentAddDialog open={open} onOpenChange={setOpen} />
        </>
    );
}
