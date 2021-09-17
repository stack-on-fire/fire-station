import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Link from "next/link";
import { Endpoint, Project } from "@prisma/client";

const Breadcrumbs = ({
  project,
  selectedEndpoint,
}: {
  project: Project;
  selectedEndpoint: Endpoint;
}) => {
  return (
    <>
      {" "}
      <Breadcrumb mb={8}>
        <BreadcrumbItem>
          <Link href="/" passHref>
            <BreadcrumbLink>Projects</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem color={selectedEndpoint ? undefined : "gray.400"}>
          <Link
            href={`/projects/[id]`}
            as={`/projects/${project?.id}`}
            passHref
          >
            <BreadcrumbLink>{project?.name}</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>
        {selectedEndpoint && (
          <BreadcrumbItem color="gray.500">
            <BreadcrumbLink>{selectedEndpoint?.name}</BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>
    </>
  );
};

export default Breadcrumbs;
