import {
  Project as ProjectWrapper,
  ProjectTitle,
  ProjectStack,
  ProjectStackTech,
  ProjectLink,
  ProjectLinks,
} from "./style";

import { Text } from "@/styles/Text";
import { useEffect, useState } from "react";
import { FaGithub, FaShare } from "react-icons/fa";
import { userData } from "@/utils/userData";

interface ReposType {
  id: number;
  name: string;
  language: string;
  description: string;
  html_url: string;
  homepage: string;
  has_pages:boolean;
}

export const Project = (): JSX.Element => {
  const [repositories, setRepositories] = useState<ReposType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://api.github.com/users/${userData.githubUser}/repos`
      );
      const json = await data.json();
      setRepositories(json);
      return json;
    };
    fetchData();
  }, []);
  const urlBasePages = "https://victorcazuriaga.github.io/" 

  console.log(repositories)
  return (
    <>
      {repositories?.map((repository) => (

        <ProjectWrapper key={repository.id}>
          <ProjectTitle
            as="h2"
            type="heading3"
            css={{ marginBottom: "$3" }}
            color="grey4"
          >
            {repository.name}
          </ProjectTitle>

          <ProjectStack>
            <Text type="body2" color="grey2">
              Linguagem:
            </Text>
            {repository.language ? (
              <ProjectStackTech>
                <Text color="grey2" type="body2">
                  {repository.language}
                </Text>
              </ProjectStackTech>
            ) : (
              <ProjectStackTech>
                <Text color="grey2" type="body2">
                  Not identified
                </Text>
              </ProjectStackTech>
            )}
          </ProjectStack>

          <Text type="body1" color="grey2">
            
            {/* {repository.description.substring(0, 129)} */}
          </Text>
          <ProjectLinks>
            <ProjectLink target="_blank" href={repository.html_url}>
              <FaGithub /> Github Code
            </ProjectLink>
            {repository.has_pages && (
              <ProjectLink target="_blank" href={`${urlBasePages}${repository.name}`}>
                <FaShare /> Aplicação
              </ProjectLink>
            )}
          </ProjectLinks>
        </ProjectWrapper>
      ))}
    </>
  );
};
