import { useMemo, useCallback, useState } from 'react';
import type { Student } from '@/lib/types';

/**
 * 학생 필터링 로직을 관리하는 custom hook
 * 
 * 검색어, 상태 필터, 지점 필터를 관리하고 필터링된 학생 목록을 반환합니다.
 */
export function useStudentFilter(students: Student[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [branchFilter, setBranchFilter] = useState<string[]>([]);

  // 고유한 지점과 상태 목록을 메모이제이션
  const uniqueBranches = useMemo(
    () => Array.from(new Set(students.map(s => s.branch))),
    [students]
  );

  const uniqueStatuses = useMemo(
    () => Array.from(new Set(students.map(s => s.status))),
    [students]
  );

  // 필터링된 학생 목록을 메모이제이션
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchMatch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase());

      const statusMatch = statusFilter.length === 0 || statusFilter.includes(student.status);
      const branchMatch = branchFilter.length === 0 || branchFilter.includes(student.branch);

      return searchMatch && statusMatch && branchMatch;
    });
  }, [students, searchTerm, statusFilter, branchFilter]);

  // 필터 핸들러들을 useCallback으로 메모이제이션
  const handleStatusChange = useCallback((status: string) => {
    setStatusFilter(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  }, []);

  const handleBranchChange = useCallback((branch: string) => {
    setBranchFilter(prev =>
      prev.includes(branch) ? prev.filter(b => b !== branch) : [...prev, branch]
    );
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const resetFilters = useCallback(() => {
    setSearchTerm("");
    setStatusFilter([]);
    setBranchFilter([]);
  }, []);

  return {
    searchTerm,
    statusFilter,
    branchFilter,
    uniqueBranches,
    uniqueStatuses,
    filteredStudents,
    handleSearchChange,
    handleStatusChange,
    handleBranchChange,
    resetFilters,
  };
}

