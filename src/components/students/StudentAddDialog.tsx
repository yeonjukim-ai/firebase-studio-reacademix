"use client";

import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface StudentAddDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function StudentAddDialog({ open, onOpenChange }: StudentAddDialogProps) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState(false);

    // Form states
    const [name, setName] = React.useState("");
    const [branch, setBranch] = React.useState("");
    const [className, setClassName] = React.useState("");
    const [status, setStatus] = React.useState("active");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log("Adding student:", { name, branch, className, status });

        toast({
            title: "학생 추가 완료",
            description: `${name} 학생이 추가되었습니다. (현재는 데모 모드입니다)`,
        });

        setIsLoading(false);
        onOpenChange(false);

        // Reset form
        setName("");
        setBranch("");
        setClassName("");
        setStatus("active");
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>학생 추가</DialogTitle>
                    <DialogDescription>
                        새로운 학생의 정보를 입력해주세요.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                이름
                            </Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="col-span-3"
                                required
                                placeholder="홍길동"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="branch" className="text-right">
                                지점
                            </Label>
                            <Select value={branch} onValueChange={setBranch} required>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="지점 선택" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="서초 본원">서초 본원</SelectItem>
                                    <SelectItem value="강남 분원">강남 분원</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="class" className="text-right">
                                반
                            </Label>
                            <Input
                                id="class"
                                value={className}
                                onChange={(e) => setClassName(e.target.value)}
                                className="col-span-3"
                                required
                                placeholder="A반"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                상태
                            </Label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="상태 선택" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">재원</SelectItem>
                                    <SelectItem value="inactive">퇴원</SelectItem>
                                    <SelectItem value="on_leave">휴원</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "추가 중..." : "추가하기"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
